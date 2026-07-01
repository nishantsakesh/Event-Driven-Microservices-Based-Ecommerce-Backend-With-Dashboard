import { motion } from "framer-motion";

function Float({ children }) {

    return (

        <motion.div

            animate={{
                y:[-12,12,-12]
            }}

            transition={{
                repeat:Infinity,
                duration:6
            }}

        >

            {children}

        </motion.div>

    );

}

export default Float;