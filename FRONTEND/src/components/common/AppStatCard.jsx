import AppCard from "./AppCard";

export default function AppStatCard({
    title,
    value,
    icon,
}) {
    return (
        <AppCard variant="dashboard">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                        {value}
                    </h3>

                </div>

                {icon}

            </div>

        </AppCard>
    );
}