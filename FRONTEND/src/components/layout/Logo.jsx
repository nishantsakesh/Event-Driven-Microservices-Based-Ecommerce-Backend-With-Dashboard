import { Headphones } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-3"
        >
            <div className="rounded-xl bg-orange-500 p-2 text-white">
                <Headphones size={22} />
            </div>

            <span className="text-2xl font-black">
                AudioHub
            </span>
        </Link>
    );
}