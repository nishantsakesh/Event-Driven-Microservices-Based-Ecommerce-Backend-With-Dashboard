export default function BackgroundGlow() {
    return (
        <>
            <div className="pointer-events-none absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-[150px]" />

            <div className="pointer-events-none absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[170px]" />
        </>
    );
}