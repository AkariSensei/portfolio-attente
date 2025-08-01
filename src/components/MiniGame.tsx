import { useState } from "react";
import { motion } from "framer-motion";

interface MiniGameProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function MiniGame({ score, setScore }: MiniGameProps) {
    const [plusOne, setPlusOne] = useState<number[]>([]);

    const handleButtonClick = () => {
        setScore((prev) => prev + 1);
        const id = Date.now();
        setPlusOne((prev) => [...prev, id]);
        setTimeout(() => setPlusOne((prev) => prev.filter((x) => x !== id)), 600);
    };

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
