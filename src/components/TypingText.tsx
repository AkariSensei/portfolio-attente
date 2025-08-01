import { useEffect, useState } from "react";

export default function TypingText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const speed = 60;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                const nextChar = text.charAt(index);
                setDisplayedText((prev) => prev + nextChar);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayedText}</span>;
}