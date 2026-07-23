import { cn } from "../../lib/utils";

export default function Divider({
    className,
}) {
    return (
        <div
            className={cn(
                "h-px w-full bg-white/10",
                className
            )}
        />
    );
}