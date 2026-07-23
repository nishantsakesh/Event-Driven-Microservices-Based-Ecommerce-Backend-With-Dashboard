import AppButton from "./AppButton";

export default function AppEmptyState({
    title,
    description,
    buttonText,
    onClick,
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">

            <h2 className="text-2xl font-semibold">
                {title}
            </h2>

            <p className="mt-3 max-w-md text-slate-400">
                {description}
            </p>

            {buttonText && (
                <AppButton
                    className="mt-6"
                    onClick={onClick}
                >
                    {buttonText}
                </AppButton>
            )}

        </div>
    );
}