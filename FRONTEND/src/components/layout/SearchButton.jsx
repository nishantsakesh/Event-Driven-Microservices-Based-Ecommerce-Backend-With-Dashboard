import { Search } from "lucide-react";

export default function SearchButton() {
    return (
        <button
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-400 transition hover:bg-white/10 md:flex"
        >
            <Search size={18} />

            <span>Search</span>

            <kbd className="rounded border border-white/10 px-2 py-1 text-xs">
                Ctrl K
            </kbd>
        </button>
    );
}