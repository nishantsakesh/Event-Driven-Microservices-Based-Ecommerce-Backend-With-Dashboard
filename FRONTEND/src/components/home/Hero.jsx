import Section from "../ui/Section";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
    return (
        <Section className="min-h-screen flex items-center">

            <div className="grid items-center gap-20 lg:grid-cols-2">

                <HeroContent />

                <HeroImage />

            </div>

        </Section>
    );
}