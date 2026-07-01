import { motion } from "framer-motion";

function FadeUp({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 60
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{ once: true }}
            transition={{
                duration: .8,
                delay
            }}
        >
            {children}
        </motion.div>
    );
}

export default FadeUp;