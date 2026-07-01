import { motion } from "framer-motion";

function ProductShowcase() {

    return (

        <section className="py-40 bg-[#f7f7f7] overflow-hidden">

            <div className="max-w-7xl mx-auto">

                <p
                    className="uppercase tracking-[8px] text-gray-400 text-center"
                >
                    Featured Product
                </p>

                <h2
                    className="text-6xl font-black text-center mt-5"
                >

                    Air Studio Pro

                </h2>

                <p
                    className="text-center text-gray-500 text-xl mt-6"
                >

                    Designed for professionals.
                    Built for everyone.

                </p>

                <div
                    className="grid lg:grid-cols-2 items-center mt-24 gap-20"
                >

                    {/* IMAGE */}

                    <motion.div

                        initial={{
                            opacity:0,
                            x:-100
                        }}

                        whileInView={{
                            opacity:1,
                            x:0
                        }}

                        transition={{
                            duration:1
                        }}

                        className="relative"

                    >

                        <div
                            className="
                            absolute
                            w-[500px]
                            h-[500px]
                            rounded-full
                            bg-blue-200/30
                            blur-[130px]
                            left-1/2
                            top-1/2
                            -translate-x-1/2
                            -translate-y-1/2"
                        />

                        <img

                            src="/hero/headphone.png"

                            className="relative z-10 scale-125"

                        />

                    </motion.div>

                    {/* DETAILS */}

                    <motion.div

                        initial={{
                            opacity:0,
                            x:100
                        }}

                        whileInView={{
                            opacity:1,
                            x:0
                        }}

                        transition={{
                            duration:1
                        }}

                    >

                        <div
                            className="
                            rounded-[40px]
                            bg-white
                            p-12
                            shadow-xl"
                        >

                            <h3
                                className="text-4xl font-bold"
                            >

                                AudioHub Air Studio Pro

                            </h3>

                            <p
                                className="mt-8 text-gray-500 leading-9"
                            >

                                Precision engineered drivers,
                                adaptive ANC,
                                premium aluminium body,
                                spatial audio
                                and 40-hour battery life.

                            </p>

                            <div
                                className="grid grid-cols-2 gap-8 mt-12"
                            >

                                <div>

                                    <h2 className="text-4xl font-black">

                                        40h

                                    </h2>

                                    <p>

                                        Battery

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-4xl font-black">

                                        ANC

                                    </h2>

                                    <p>

                                        Noise Cancellation

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-4xl font-black">

                                        Hi-Res

                                    </h2>

                                    <p>

                                        Certified Audio

                                    </p>

                                </div>

                                <div>

                                    <h2 className="text-4xl font-black">

                                        BT 5.4

                                    </h2>

                                    <p>

                                        Bluetooth

                                    </p>

                                </div>

                            </div>

                            <button

                                className="
                                mt-12
                                bg-black
                                text-white
                                px-8
                                py-4
                                rounded-full"

                            >

                                Learn More

                            </button>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

}

export default ProductShowcase;