import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const variants = {
    default:
        "bg-orange-500 text-white",

    success:
        "bg-green-600 text-white",

    warning:
        "bg-yellow-500 text-black",

    danger:
        "bg-red-600 text-white",

    outline:
        "border border-orange-500 text-orange-500 bg-transparent",
};

export default function AppBadge({
    children,
    variant = "default",
    className,
}) {
    return (
        <Badge
            className={cn(
                "rounded-full px-3 py-1",
                variants[variant],
                className
            )}
        >
            {children}
        </Badge>
    );
}