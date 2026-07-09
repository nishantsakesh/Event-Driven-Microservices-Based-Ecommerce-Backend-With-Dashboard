import { motion } from "framer-motion";

import {
    AudioButton,
    AudioHeading,
    AudioText
} from "../../common";

function HeroContent() {

    return (

        <motion.div

            initial={{
                opacity: 0,
                x: -50
            }}

            animate={{
                opacity: 1,
                x: 0
            }}

            transition={{
                duration: 0.8
            }}

        >

            <p
                className="
                uppercase
                tracking-[10px]
                text-sm
                text-yellow-400
                mb-8
                font-medium"
            >

                PREMIUM AUDIO REDEFINED

            </p>

            <AudioHeading

                title={
                    <>
                        Hear
                        <br />
                        Every
                        <br />
                        Detail.
                    </>
                }

            />

            <AudioText

                className="
                mt-8
                max-w-xl
                text-lg"

            >

                Discover premium headphones, earbuds,
                speakers and professional audio equipment
                from the world's most trusted brands.
                Carefully curated, competitively priced,
                and backed by genuine warranty.

            </AudioText>

            <div

                className="
                flex
                flex-wrap
                gap-4
                mt-12"

            >

                <AudioButton>

                    Explore Collection

                </AudioButton>

                <AudioButton
                    variant="secondary"
                >

                    Learn More

                </AudioButton>

            </div>

        </motion.div>

    );

}

export default HeroContent;