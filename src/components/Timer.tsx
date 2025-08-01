interface TimerProps {
    timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function Timer({ timeLeft }: TimerProps) {
    const labels = ["jours", "heures", "minutes", "sec."];
    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

    return (
        <div>Eheh</div>
    );
}
