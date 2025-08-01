interface TimerProps {
    timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function Timer({ timeLeft }: TimerProps) {
    const labels = ["jours", "heures", "minutes", "sec."];
    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

    return (
        <div className="flex flex-col items-center text-center mt-24">
            <h1 className="text-5xl mb-2">Portfolio en construction</h1>
            <p className="mb-8 text-lg opacity-80">Mon nouveau portfolio arrive bientôt</p>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                {labels.map((label, index) => (
                    <div
                        key={label}
                        className="flex flex-col p-4 bg-[rgba(34,197,94,0.15)] rounded-box items-center min-w-[80px]">
                        <span className="countdown font-mono text-5xl text-primary flex justify-center w-full">
                            <span style={{ "--value": values[index] } as React.CSSProperties}></span>
                        </span>
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}
