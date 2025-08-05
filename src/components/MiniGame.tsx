import {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function MiniGame() {
    const [serverScore, setServerScore] = useState(0);
    const [plusOne, setPlusOne] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Score synchronisation
    const pendingScore = useRef<number | null>(null);
    const syncTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchScore = async () => {
            const { data, error } = await supabase
                .from("scores")
                .select("value")
                .eq("id", 1)
                .single();
            if (error) {
                console.error("Erreur de récupération du score :", error);
                setErrorMessage("Impossible de charger le score depuis la BDD.");
            } else if (data) {
                setServerScore(data.value);
            }
            setLoading(false);
        }
        fetchScore().catch((error) => {
            console.log("Erreur réseau :", error);
            setErrorMessage("Erreur réseau lors du chargement du score.");
            setLoading(false);
        });

        // Abonnement temps réel BDD
        const channel = supabase
            .channel("score-changes")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "scores" },
                (payload) => {
                    if (payload.new.id === 1) {
                        setServerScore(payload.new.value);
                    }
                }
            )
            .subscribe();

        window.addEventListener("beforeunload", flushPendingScore);

        return () => {
            window.removeEventListener("beforeunload", flushPendingScore);
            supabase.removeChannel(channel);
            flushPendingScore(); // Forcage d'une sync
        }
    }, []);

    const flushPendingScore = async () => {
        if (pendingScore.current === null) return;
        const { error } = await supabase
            .from("scores")
            .update({ value: pendingScore.current })
            .eq("id", 1);
        if (error) {
            console.error("Erreur maj score :", error);
            setErrorMessage("Impossible d'enregistrer le score.");
        }
        else {
            setErrorMessage(null);
            pendingScore.current = null;
        }
    }

    const scheduleSync = () => {
        if (syncTimeout.current) return;
        syncTimeout.current = setTimeout(async () => {
            syncTimeout.current = null;
            await flushPendingScore();
        }, 2000); // envoie après 2 sec d’inactivité
    };

    const handleButtonClick = async () => {
        const newScore = serverScore + 1;
        setServerScore(newScore);

        // Score en attente
        pendingScore.current = newScore;
        scheduleSync();

        const id = Date.now();
        setPlusOne((prev) => [...prev, id]);
        setTimeout(() => setPlusOne((prev) => prev.filter((x) => x !== id)), 600);
    }

    if (loading) return <p className="text-lg mt-6">Chargement du score...</p>;

    return (
        <div className="mt-12 sm:mt-16 flex flex-col items-center relative px-4">
            {errorMessage && (
                <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
            )}
            <h2 className="text-lg sm:text-2xl mb-4 font-semibold">Pendant que tu attends :</h2>
            <button
                onClick={handleButtonClick}
                className="btn btn-primary text-lg sm:text-xl px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:scale-105 transition-transform relative"
            >
                Clique-moi !
                {plusOne.map((id) => (
                    <motion.span
                        key={id}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.6 }}
                        className="absolute left-1/2 -translate-x-1/2 text-green-400 font-bold"
                    >
                        +1
                    </motion.span>
                ))}
            </button>
            <p className="mt-3 text-base sm:text-lg">Score : {serverScore}</p>
        </div>
    );
}
