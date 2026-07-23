import Container from "./Container";
import { cn } from "../../lib/utils";

export default function Section({
    children,
    className,
    containerClassName,
}) {
    return (
        <section
            className={cn(
                "py-24",
                className
            )}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}