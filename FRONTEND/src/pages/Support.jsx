import { Mail, ShieldCheck, Truck } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { AudioCard, AudioContainer, AudioHeading, AudioSection, AudioText } from "../components/common";

function Support() {
    const items = [
        { icon: <ShieldCheck size={28} />, title: "Genuine guarantee", text: "Every listing is sourced from authorized distributors, wholesalers, or brands." },
        { icon: <Truck size={28} />, title: "Delivery help", text: "Orders are tracked clearly, with support for delivery questions and product issues." },
        { icon: <Mail size={28} />, title: "Human support", text: "Reach the team for product guidance, warranty direction, or order assistance." },
    ];

    return (
        <MainLayout>
            <AudioSection className="bg-black pt-44">
                <AudioContainer>
                    <AudioHeading
                        eyebrow="Support"
                        title="Trust is part of the product."
                        subtitle="AudioHub is built for long-term customer confidence, not one-time margin."
                    />
                    <div className="mt-16 grid gap-6 lg:grid-cols-3">
                        {items.map((item) => (
                            <AudioCard key={item.title}>
                                <div className="mb-8 text-white">{item.icon}</div>
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                <AudioText className="mt-4">{item.text}</AudioText>
                            </AudioCard>
                        ))}
                    </div>
                </AudioContainer>
            </AudioSection>
        </MainLayout>
    );
}

export default Support;
