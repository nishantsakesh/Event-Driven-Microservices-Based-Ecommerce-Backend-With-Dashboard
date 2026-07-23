import { Bell, ShoppingCart, User } from "lucide-react";

export default function UserMenu() {
    return (
        <div className="flex items-center gap-4">

            <button className="rounded-xl p-2 transition hover:bg-white/10">
                <Bell size={20} />
            </button>

            <button className="rounded-xl p-2 transition hover:bg-white/10">
                <ShoppingCart size={20} />
            </button>

            <button className="rounded-full bg-orange-500 p-2">
                <User size={20} />
            </button>

        </div>
    );
}