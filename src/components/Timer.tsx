interface TimerProps {
    timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function Timer({ timeLeft }: TimerProps) {
    const labels = ["jours", "heures", "minutes", "sec."];
    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

    return (
        <div className="flex flex-col items-center text-center mt-16 sm:mt-24 px-4">
            <h1 className="text-2xl sm:text-5xl mb-2 font-bold">Portfolio en construction</h1>
            <p className="mb-8 text-sm sm:text-lg opacity-80">Mon nouveau portfolio arrive bientôt</p>
            <div className="grid grid-cols-2 sm:grid-flow-col gap-3 sm:gap-5">
                {labels.map((label, index) => (
                    <div
                        key={label}
                        className="flex flex-col p-3 sm:p-4 bg-[rgba(34,197,94,0.15)] rounded-box items-center min-w-[70px] sm:min-w-[90px]"
                    >
            <span className="countdown font-mono text-3xl sm:text-5xl text-primary flex justify-center w-full">
              <span style={{ "--value": values[index] } as React.CSSProperties}></span>
            </span>
                        <span className="text-xs sm:text-sm">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
