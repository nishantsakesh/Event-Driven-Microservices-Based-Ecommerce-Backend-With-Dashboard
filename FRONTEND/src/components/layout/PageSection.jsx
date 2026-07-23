import Section from "../ui/Section";
import { cn } from "../../lib/utils";

export default function PageSection({
    title,
    subtitle,
    children,
    className,
}) {
    return (
        <Section className={cn("py-20", className)}>

            {(title || subtitle) && (
                <div className="mb-12">

                    {title && (
                        <h2 className="text-4xl font-bold">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-3 max-w-2xl text-slate-400">
                            {subtitle}
                        </p>
                    )}

                </div>
            )}

            {children}

        </Section>
    );
}