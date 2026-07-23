import { motion } from "framer-motion";

export default function SlideUp({
    children,
    delay = 0,
    className,
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}