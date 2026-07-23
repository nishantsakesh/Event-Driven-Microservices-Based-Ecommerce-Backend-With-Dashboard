import AppCard from "../common/AppCard";

export default function FeatureCard({
    icon,
    title,
    description,
}) {
    return (
        <AppCard className="p-6 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/20">

            <div className="mb-6">
                {icon}
            </div>

            <h3 className="text-2xl font-semibold">
                {title}
            </h3>

            <p className="mt-4 text-slate-400">
                {description}
            </p>

        </AppCard>
    );
}