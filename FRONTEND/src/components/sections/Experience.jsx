import { motion } from "framer-motion";
import {
    BatteryCharging,
    Volume2,
    Waves,
    Bluetooth
} from "lucide-react";

function Experience() {

    const features = [

        {
            icon: <Volume2 size={30} />,
            title: "Studio Tuned Sound",
            desc: "Balanced audio with crystal-clear vocals."
        },

        {
            icon: <Waves size={30} />,
            title: "Spatial Audio",
            desc: "Feel surrounded by immersive sound."
        },

        {
            icon: <BatteryCharging size={30} />,
            title: "40 Hour Battery",
            desc: "Listen longer without interruptions."
        },

        {
            icon: <Bluetooth size={30} />,
            title: "Bluetooth 5.4",
            desc: "Faster pairing and lower latency."
        }

    ];

    return (

        <section className="bg-black text-white py-40 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                <div className="text-center">

                    <p className="uppercase tracking-[8px] text-gray-500">

                        Immersive Experience

                    </p>

                    <h2 className="text-6xl font-black mt-6">

                        Engineered To Disappear.

                    </h2>

                    <p className="text-gray-400 text-xl mt-8">

                        So only your music remains.

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-24 items-center mt-28">

                    {/* LEFT */}

                    <motion.div

                        initial={{opacity:0}}

                        whileInView={{opacity:1}}

                        transition={{duration:1}}

                        className="space-y-8"

                    >

                        {

                            features.map((item,index)=>(

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity:0,
                                        x:-80
                                    }}

                                    whileInView={{
                                        opacity:1,
                                        x:0
                                    }}

                                    transition={{
                                        delay:index*0.15
                                    }}

                                    className="
                                    border
                                    border-white/10
                                    rounded-3xl
                                    p-8
                                    bg-white/5
                                    backdrop-blur-xl"

                                >

                                    <div className="mb-5">

                                        {item.icon}

                                    </div>

                                    <h3 className="text-2xl font-bold">

                                        {item.title}

                                    </h3>

                                    <p className="text-gray-400 mt-4">

                                        {item.desc}

                                    </p>

                                </motion.div>

                            ))

                        }

                    </motion.div>

                    {/* RIGHT */}

                    <motion.div

                        animate={{
                            rotate:[-3,3,-3],
                            y:[-15,15,-15]
                        }}

                        transition={{
                            duration:8,
                            repeat:Infinity
                        }}

                        className="relative"

                    >

                        <div

                            className="
                            absolute
                            w-[600px]
                            h-[600px]
                            rounded-full
                            bg-yellow-300/10
                            blur-[150px]
                            left-1/2
                            top-1/2
                            -translate-x-1/2
                            -translate-y-1/2"

                        />

                        <img

                            src="/hero/headphone.png"

                            className="
                            relative
                            z-10
                            scale-[1.35]"

                            alt="Headphones"

                        />

                    </motion.div>

                </div>

            </div>

        </section>

    );

}

export default Experience;