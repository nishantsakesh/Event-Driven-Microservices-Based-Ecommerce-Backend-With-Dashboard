import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function AppInput({
    label,
    error,
    className,
    ...props
}) {
    return (
        <div className="space-y-2">

            {label && (
                <label className="text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}

            <Input
                className={cn(
                    "h-11 rounded-xl border-white/10 bg-white/5",
                    "focus-visible:ring-orange-500",
                    error && "border-red-500",
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}