import { Bluetooth, Gauge, Radio, Waves } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { AudioCard, AudioContainer, AudioHeading, AudioSection, AudioText } from "../components/common";

function Technology() {
    const features = [
        { icon: <Waves size={28} />, title: "Tuned clarity", text: "Products are selected for clean vocals, balanced bass, and long-session comfort." },
        { icon: <Radio size={28} />, title: "Reliable signal", text: "Wireless picks prioritize stable pairing and low everyday friction." },
        { icon: <Gauge size={28} />, title: "Latency aware", text: "Gaming and creator gear is framed around response, microphone quality, and endurance." },
        { icon: <Bluetooth size={28} />, title: "Modern standards", text: "Bluetooth, ANC, codec support, and battery life are treated as buying context." },
    ];

    return (
        <MainLayout>
            <AudioSection className="bg-black pt-44">
                <AudioContainer>
                    <AudioHeading
                        eyebrow="Technology"
                        title="Less noise around the choice."
                        subtitle="AudioHub explains what matters so customers can buy with confidence, not comparison fatigue."
                    />
                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        {features.map((item) => (
                            <AudioCard key={item.title} className="rounded-3xl">
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

export default Technology;
