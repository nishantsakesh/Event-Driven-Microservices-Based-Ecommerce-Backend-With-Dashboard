import PageSection from "../layout/PageSection";
import FeatureCard from "../layout/FeatureCard";

import { features } from "../../constants/features";

export default function Features() {
    return (
        <PageSection
            title="Why Choose AudioHub?"
            subtitle="Premium products with premium service."
        >
            <div className="grid gap-8 md:grid-cols-3">

                {features.map((feature) => {

                    const Icon = feature.icon;

                    return (
                        <FeatureCard
                            key={feature.title}
                            icon={<Icon size={42} />}
                            title={feature.title}
                            description={feature.description}
                        />
                    );

                })}

            </div>
        </PageSection>
    );
}