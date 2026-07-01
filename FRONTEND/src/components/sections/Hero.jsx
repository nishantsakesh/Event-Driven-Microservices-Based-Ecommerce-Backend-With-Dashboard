import { motion } from "framer-motion";

import {

    AudioButton,
    AudioContainer,
    AudioHeading,
    AudioSection,
    AudioText

} from "../common";

function Hero() {

    return (

        <AudioSection
            className="
            relative
            overflow-hidden
            bg-black
            min-h-screen
            flex
            items-center"

        >

            <h1

                className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                text-[320px]
                font-black
                text-white/5
                whitespace-nowrap"

            >

                AUDIOHUB

            </h1>

            <AudioContainer>

                <div
                    className="
                    grid
                    lg:grid-cols-2
                    gap-20
                    items-center
                    relative
                    z-10"

                >

                    <motion.div

                        initial={{
                            opacity:0,
                            x:-80
                        }}

                        animate={{
                            opacity:1,
                            x:0
                        }}

                    >

                        <AudioHeading

                            eyebrow="Designed For Those Who Listen"

                            title={
                                <>
                                    SOUND
                                    <br/>
                                    WITHOUT
                                    <br/>
                                    LIMITS
                                </>
                            }

                        />

                        <AudioText
                            className="mt-10 max-w-xl text-lg"
                        >

                            Premium audio products engineered
                            to deliver incredible clarity,
                            comfort and timeless design.

                        </AudioText>

                        <div
                            className="flex gap-5 mt-12"
                        >

                            <AudioButton>

                                Explore

                            </AudioButton>

                            <AudioButton
                                variant="secondary"
                            >

                                Watch Film

                            </AudioButton>

                        </div>

                    </motion.div>

                    <motion.div

                        animate={{
                            y:[-15,15,-15]
                        }}

                        transition={{
                            repeat:Infinity,
                            duration:6
                        }}

                    >

                        <img

                            src="/hero/headphone.png"

                            className="
                            scale-[1.45]
                            drop-shadow-[0_40px_80px_rgba(255,255,255,.15)]"

                        />

                    </motion.div>

                </div>

            </AudioContainer>

        </AudioSection>

    );

}

export default Hero;