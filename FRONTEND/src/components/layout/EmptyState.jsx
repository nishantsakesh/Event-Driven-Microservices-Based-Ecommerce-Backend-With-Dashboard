import Button from "../ui/Button";

export default function EmptyState({
    title,
    description,
    buttonText,
    buttonLink,
}) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">

            <h2 className="text-3xl font-bold">
                {title}
            </h2>

            <p className="mt-4 max-w-lg text-slate-400">
                {description}
            </p>

            {buttonText && (
                <Button
                    to={buttonLink}
                    className="mt-8"
                >
                    {buttonText}
                </Button>
            )}

        </div>
    );
}