import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const variants = {
    default:
        "bg-card border",

    glass:
        "bg-white/5 backdrop-blur-xl border border-white/10",

    product:
        "bg-surface border border-white/10 overflow-hidden",

    dashboard:
        "bg-card border shadow-sm",
};

export default function AppCard({
    children,
    variant = "default",
    hover = false,
    clickable = false,
    className,
    ...props
}) {
    return (
        <Card
            className={cn(
                "rounded-3xl transition-all duration-300",
                variants[variant],
                hover && "hover:-translate-y-1 hover:shadow-xl",
                clickable && "cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    );
}