import { motion } from "framer-motion";

export default function Stagger({
    children,
    className,
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: .15,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}