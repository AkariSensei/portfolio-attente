import { useState, useCallback, useEffect } from "react";

interface MiniGameProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

interface FloatingText {
    id: number;
    value: number;
    x: number;
    y: number;
}

export default function MiniGame({ score, setScore }: MiniGameProps) {
    const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
    const [multiplier, setMultiplier] = useState(1);
    const [combo, setCombo] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [isShaking, setIsShaking] = useState(false);

    // Système de combo : si on clique rapidement, le multiplicateur augmente
    useEffect(() => {
        const timer = setTimeout(() => {
            if (Date.now() - lastClickTime > 1000) {
                setCombo(0);
                setMultiplier(1);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [lastClickTime]);

    const getScoreIncrement = useCallback(() => {
        // Points de base + bonus de combo
        const basePoints = 1;
        const comboBonus = Math.floor(combo / 5); // Bonus tous les 5 clics
        return basePoints + comboBonus;
    }, [combo]);

    const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const now = Date.now();
        const rect = event.currentTarget.getBoundingClientRect();

        // Position relative au bouton pour l'animation
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        const increment = getScoreIncrement();

        // Mise à jour du score
        setScore((prev) => prev + increment);

        // Système de combo
        if (now - lastClickTime < 500) {
            setCombo(prev => prev + 1);
            setMultiplier(Math.min(5, Math.floor(combo / 3) + 1));
        } else {
            setCombo(1);
            setMultiplier(1);
        }
        setLastClickTime(now);

        // Animation de secousse
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 150);

        // Texte flottant
        const floatingText: FloatingText = {
            id: now,
            value: increment,
            x: x + (Math.random() - 0.5) * 40, // Variation aléatoire
            y: y + (Math.random() - 0.5) * 20,
        };

        setFloatingTexts(prev => [...prev, floatingText]);

        // Nettoyer le texte après l'animation
        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(text => text.id !== floatingText.id));
        }, 1000);
    }, [getScoreIncrement, lastClickTime, combo, setScore]);

    const getButtonColor = () => {
        if (combo >= 20) return "from-purple-500 to-pink-500";
        if (combo >= 15) return "from-red-500 to-orange-500";
        if (combo >= 10) return "from-orange-500 to-yellow-500";
        if (combo >= 5) return "from-blue-500 to-purple-500";
        return "from-green-500 to-blue-500";
    };

    const getComboText = () => {
        if (combo >= 20) return "🔥 INCROYABLE! 🔥";
        if (combo >= 15) return "⚡ FANTASTIQUE! ⚡";
        if (combo >= 10) return "✨ SUPER! ✨";
        if (combo >= 5) return "🎯 Combo!";
        return "";
    };

    return (
        <div className="mt-12 sm:mt-16 flex flex-col items-center relative px-4">
            <h2 className="text-lg sm:text-2xl mb-4 font-semibold text-gray-800">
                Pendant que tu attends :
            </h2>

            {/* Indicateurs de combo */}
            <div className="mb-4 text-center min-h-[2rem]">
                {combo >= 5 && (
                    <div className="animate-pulse">
                        <div className="text-lg font-bold text-purple-600">
                            {getComboText()}
                        </div>
                        <div className="text-sm text-gray-600">
                            Combo: {combo} | Multiplicateur: x{multiplier}
                        </div>
                    </div>
                )}
            </div>

            {/* Bouton principal */}
            <div className="relative">
                <button
                    onClick={handleButtonClick}
                    className={`
                        relative overflow-hidden
                        bg-gradient-to-r ${getButtonColor()}
                        text-white text-lg sm:text-xl font-bold
                        px-8 py-4 sm:px-10 sm:py-5
                        rounded-full shadow-lg
                        transform transition-all duration-150
                        hover:scale-105 active:scale-95
                        ${isShaking ? 'animate-pulse' : ''}
                        focus:outline-none focus:ring-4 focus:ring-blue-300
                    `}
                    style={{
                        transform: isShaking ? 'translate(1px, 1px)' : 'translate(0, 0)'
                    }}
                >
                    Clique !

                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-200 rounded-full"></div>
                </button>

                {/* Textes flottants */}
                {floatingTexts.map((text) => (
                    <div
                        key={text.id}
                        className="absolute pointer-events-none z-10 animate-bounce opacity-100"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${text.x}px), calc(-50% + ${text.y}px))`,
                            transition: 'opacity 1s ease-out, transform 1s ease-out',
                        }}
                    >
                        <span className={`
                            text-2xl font-bold
                            ${text.value > 1 ? 'text-yellow-400' : 'text-green-400'}
                            drop-shadow-md animate-pulse
                        `}>
                            +{text.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Affichage du score */}
            <div className="mt-6 text-center">
                <p className="text-base sm:text-lg text-gray-700">
                    Score : <span className="font-bold text-2xl text-blue-600">{score}</span>
                </p>
                <div className="mt-2 text-sm text-gray-500">
                    {score > 0 && (
                        <p>Clics par seconde: ~{(score / ((Date.now() - (Date.now() - 10000)) / 1000) || 0).toFixed(1)}</p>
                    )}
                </div>
            </div>

            {/* Barre de progression vers le prochain bonus */}
            {combo > 0 && (
                <div className="mt-4 w-48 bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(combo % 5) * 20}%` }}
                    ></div>
                    <p className="text-xs text-center mt-1 text-gray-600">
                        {5 - (combo % 5)} clics jusqu'au prochain bonus
                    </p>
                </div>
            )}
        </div>
    );
}