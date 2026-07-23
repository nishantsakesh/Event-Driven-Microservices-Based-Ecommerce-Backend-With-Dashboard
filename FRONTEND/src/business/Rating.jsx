import { Star } from "lucide-react";

export default function Rating({
    value,
    reviews,
}) {
    return (
        <div className="flex items-center gap-2">

            <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
            />

            <span>{value}</span>

            <span className="text-slate-400">
                ({reviews})
            </span>

        </div>
    );
}