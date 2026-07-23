import { Search } from "lucide-react";
import AppInput from "./AppInput";

export default function AppSearchBar({
    placeholder = "Search...",
    ...props
}) {
    return (
        <div className="relative">

            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
            />

            <AppInput
                className="pl-10"
                placeholder={placeholder}
                {...props}
            />

        </div>
    );
}