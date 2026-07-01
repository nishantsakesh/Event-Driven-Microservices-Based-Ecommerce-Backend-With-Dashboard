import { Headphones } from "lucide-react";
import { motion } from "framer-motion";

import { AudioButton } from "../common";

function Navbar() {

    const links = [

        "Home",
        "Products",
        "About",
        "Contact"

    ];

    return (

        <motion.nav

            initial={{ y: -80 }}

            animate={{ y: 0 }}

            transition={{ duration: .6 }}

            className="
            fixed
            top-0
            left-0
            right-0
            z-50"

        >

            <div
                className="
                max-w-7xl
                mx-auto
                mt-5"

            >

                <div

                    className="
                    h-20
                    rounded-full
                    border
                    border-white/10
                    bg-black/30
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-between
                    px-10"

                >

                    <div
                        className="
                        flex
                        items-center
                        gap-3"

                    >

                        <Headphones />

                        <h2
                            className="
                            tracking-[6px]
                            font-bold"

                        >

                            AUDIOHUB

                        </h2>

                    </div>

                    <div
                        className="
                        hidden
                        lg:flex
                        gap-10"

                    >

                        {

                            links.map(link => (

                                <a

                                    key={link}

                                    href="#"

                                    className="
                                    text-gray-300
                                    hover:text-white
                                    transition"

                                >

                                    {link}

                                </a>

                            ))

                        }

                    </div>

                    <AudioButton>

                        Login

                    </AudioButton>

                </div>

            </div>

        </motion.nav>

    );

}

export default Navbar;