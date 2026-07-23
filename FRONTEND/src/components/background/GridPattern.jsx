export default function GridPattern() {
    return (
        <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
                backgroundImage:
                    "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "60px 60px",
            }}
        />
    );
}