import TypingText from "./TypingText";

export default function Header() {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 px-4 sm:px-10 mt-4 sm:mt-0">
            <img
                src="./avatar-moi.png"
                alt="Avatar"
                className="w-28 h-28 sm:w-48 sm:h-48 rounded-full border-4 border-[color:var(--color-primary)] shadow-lg"
            />
            <div className="relative bg-[rgba(34,197,94,0.2)] text-left p-3 sm:p-4 rounded-xl max-w-[220px] shadow-md">
                <TypingText text="Salut, mon portfolio arrive bientôt..." />
                <div className="hidden sm:block absolute -left-3 top-1/2 w-6 h-6 bg-[rgba(34,197,94,0.2)] rotate-45"></div>
            </div>
        </div>
    );
}
