export default function AppProductGrid({
    children,
}) {
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {children}
        </div>
    );
}