import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const variants = {
    primary:
        "bg-orange-500 text-white hover:bg-orange-600",

    secondary:
        "bg-white/10 text-white border border-white/10 hover:bg-white/20",

    outline:
        "border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white",

    ghost:
        "bg-transparent text-white hover:bg-white/10",

    danger:
        "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-12 px-8 text-base",
};

export default function AppButton({
    children,
    variant = "primary",
    size = "md",
    className,
    loading = false,
    disabled,
    ...props
}) {
    return (
        <Button
            disabled={disabled || loading}
            className={cn(
                "rounded-full font-semibold transition-all duration-300",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {loading ? "Loading..." : children}
        </Button>
    );
}