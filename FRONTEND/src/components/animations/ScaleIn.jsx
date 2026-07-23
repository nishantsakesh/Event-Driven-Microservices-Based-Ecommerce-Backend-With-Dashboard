import { motion } from "framer-motion";

export default function ScaleIn({
    children,
    className,
}) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                scale: .9,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
            }}
            viewport={{
                once: true,
            }}
            transition={{
                duration: .5,
            }}
        >
            {children}
        </motion.div>
    );
}