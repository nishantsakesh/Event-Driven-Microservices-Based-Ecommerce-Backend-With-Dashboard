import { motion } from "framer-motion";

function FadeRight({ children }) {

    return (

        <motion.div

            initial={{
                opacity:0,
                x:80
            }}

            whileInView={{
                opacity:1,
                x:0
            }}

            viewport={{once:true}}

            transition={{duration:.8}}

        >

            {children}

        </motion.div>

    );

}

export default FadeRight;