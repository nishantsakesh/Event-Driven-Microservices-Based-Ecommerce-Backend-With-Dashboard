import { cn } from "@/lib/utils";

export default function AppGrid({
    children,
    cols = 4,
    className,
}) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    };

    return (
        <div
            className={cn(
                "grid gap-6",
                gridCols[cols],
                className
            )}
        >
            {children}
        </div>
    );
}