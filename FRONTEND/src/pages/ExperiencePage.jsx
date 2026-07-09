import MainLayout from "../layouts/MainLayout";
import Experience from "../components/sections/Experience";
import Features from "../components/sections/Features";
import { AudioContainer, AudioHeading, AudioSection } from "../components/common";

function ExperiencePage() {
    return (
        <MainLayout>
            <AudioSection className="bg-black pt-44">
                <AudioContainer>
                    <AudioHeading
                        eyebrow="Experience"
                        title="Premium does not mean complicated."
                        subtitle="The buying journey should feel calm, cinematic, and useful from first glance to final checkout."
                    />
                </AudioContainer>
            </AudioSection>
            <Experience />
            <Features />
        </MainLayout>
    );
}

export default ExperiencePage;
