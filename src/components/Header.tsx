import avatar from "./assets/img/avatar-moi.png";
import TypingText from "./TypingText";

export default function Header() {
    return (
        <div className="absolute left-10 flex items-center gap-4 top-1/3">
            <img
                src={avatar}
                alt="Avatar"
                className="w-48 h-48 rounded-full border-4 border-[color:var(--color-primary)] shadow-lg"
            />
            <div className="relative bg-[rgba(34,197,94,0.2)] text-left p-4 rounded-xl max-w-[220px] shadow-md">
                <TypingText text="Salut, mon portfolio arrive bientôt..." />
                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[rgba(34,197,94,0.2)] rotate-45"></div>
            </div>
        </div>
    );
}
