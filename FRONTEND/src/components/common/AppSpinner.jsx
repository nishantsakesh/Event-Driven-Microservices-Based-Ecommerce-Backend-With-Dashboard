import { Loader2 } from "lucide-react";

export default function AppSpinner({
    size = 20,
}) {
    return (
        <Loader2
            className="animate-spin"
            size={size}
        />
    );
}