export default function AppSectionHeader({
    title,
    subtitle,
    center = false,
}) {
    return (
        <div
            className={
                center
                    ? "mb-12 text-center"
                    : "mb-12"
            }
        >
            <h2 className="text-4xl font-bold">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-3 max-w-2xl text-slate-400">
                    {subtitle}
                </p>
            )}
        </div>
    );
}