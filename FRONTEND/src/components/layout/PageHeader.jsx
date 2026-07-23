import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function PageHeader({
    badge,
    title,
    subtitle,
    children,
}) {
    return (
        <Section className="pb-12">

            <Heading
                badge={badge}
                title={title}
                subtitle={subtitle}
            />

            {children && (
                <div className="mt-10 flex justify-center">
                    {children}
                </div>
            )}

        </Section>
    );
}