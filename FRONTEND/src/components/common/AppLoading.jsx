import AppSpinner from "./AppSpinner";

export default function AppLoading({
    text = "Loading...",
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">

            <AppSpinner size={30} />

            <p className="text-slate-400">
                {text}
            </p>

        </div>
    );
}