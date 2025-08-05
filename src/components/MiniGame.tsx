import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function MiniGame() {
    const [score, setScore] = useState(0);
    const [plusOne, setPlusOne] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScore = async () => {
            const { data, error } = await supabase
                .from("scores")
                .select("value")
                .eq("id", 1)
                .single();
            if (error) {
                console.log("Erreur de récupération du score :", error);
            } else if (data) {
                setScore(data.value);
            }
            setLoading(false);
        }
        fetchScore().catch(console.error);
    }, []);

    const handleButtonClick = async () => {
        const newScore = score + 1;
        setScore(newScore);

        const { error } = await supabase
            .from("scores")
            .update({ value: newScore })
            .eq("id", 1);
        if (error) console.error("Erreur maj score :", error);

        const id = Date.now();
        setPlusOne((prev) => [...prev, id]);
        setTimeout(() => setPlusOne((prev) => prev.filter((x) => x !== id)), 600);
    }

    if (loading) return <p className="text-lg mt-6">Chargement du score...</p>;

    return (
        <div className="mt-12 sm:mt-16 flex flex-col items-center relative px-4">
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
            <p className="mt-3 text-base sm:text-lg">Score : {score}</p>
        </div>
    );
}
