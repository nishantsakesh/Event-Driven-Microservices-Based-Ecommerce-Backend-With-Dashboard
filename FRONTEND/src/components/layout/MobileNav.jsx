import { Menu } from "lucide-react";

export default function MobileNav() {
    return (
        <button
            className="rounded-xl p-2 transition hover:bg-white/10 lg:hidden"
        >
            <Menu />
        </button>
    );
}