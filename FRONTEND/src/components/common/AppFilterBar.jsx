export default function AppFilterBar({
    children,
}) {
    return (
        <div className="mb-8 flex flex-wrap items-center gap-4">
            {children}
        </div>
    );
}