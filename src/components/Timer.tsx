interface TimerProps {
    timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function Timer({ timeLeft }: TimerProps) {
    return (
        <div className="flex flex-col items-center text-center mt-24">
            <h1 className="text-5xl mb-2">Portfolio en construction</h1>
            <p className="mb-8 text-lg opacity-80">Mon nouveau portfolio arrive bientôt</p>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                {["jours", "heures", "minutes", "secondes"].map((label, index) => {
                    const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index];
                    return (
                        <div key={label} className="flex flex-col p-4 bg-[rgba(34,197,94,0.15)] rounded-box">
                            <span className="countdown font-mono text-5xl text-primary">
                                <span style={{ "--value": value } as React.CSSProperties}></span>
                            </span>
                            {label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}