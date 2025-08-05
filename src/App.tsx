import "./App.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Timer from "./components/Timer";
import MiniGame from "./components/MiniGame";

const targetDate = new Date("2025-10-01T00:00:00");

interface Particle {
    id: number;
    left: string;
    top: string;
    size: string;
    color: string;
    delay: number;
    duration: number;
}

export default function App() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [particles] = useState<Particle[]>(() =>
        Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() > 0.5 ? "w-1 h-1" : "w-1.5 h-1.5",
            color: Math.random() > 0.5 ? "bg-green-400" : "bg-emerald-200",
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 2
        }))
    );

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = Math.max(targetDate.getTime() - now, 0);
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start pt-10">
            {/* Particules */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`particle absolute rounded-full ${p.size} ${p.color} shadow-[0_0_6px_#4ade80]`}
                    style={{left: p.left, top: p.top}}
                    animate={{opacity: [0.2, 1, 0.2]}}
                    transition={{
                        delay: p.delay,
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div className="main-content w-full relative z-10 flex flex-col items-center gap-10">
                <Header/>
                <Timer timeLeft={timeLeft}/>
                <MiniGame />
            </div>

        </div>
    );
}
