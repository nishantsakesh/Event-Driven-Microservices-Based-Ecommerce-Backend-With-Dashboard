import { motion } from "framer-motion";

import headphone from "../../../assets/images/hero/headphone.png";

function HeroImage() {

    return (

        <motion.div

            initial={{
                opacity: 0,
                x: 80,
                scale: 0.92
            }}

            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: [-12, 12, -12],
                rotate: [-1, 1, -1]
            }}

            transition={{
                opacity: {
                    duration: 0.8
                },
                x: {
                    duration: 0.8
                },
                scale: {
                    duration: 0.8
                },
                y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}

            className="
            relative
            flex
            justify-center
            items-center
            h-full"

        >

            {/* Gold Glow */}

            <div

                className="
                absolute
                w-[720px]
                h-[720px]
                rounded-full
                bg-yellow-400/10
                blur-[140px]"

            />

            {/* Soft White Glow */}

            <div

                className="
                absolute
                w-[500px]
                h-[500px]
                rounded-full
                bg-white/5
                blur-[120px]"

            />

            {/* Product */}

            <img

                src={headphone}

                alt="AudioHub"

                draggable="false"

                className="
                relative
                z-10

                w-[820px]

                max-w-none

                object-contain

                select-none

                drop-shadow-[0_80px_120px_rgba(0,0,0,.65)]"

            />

        </motion.div>

    );

}

export default HeroImage;