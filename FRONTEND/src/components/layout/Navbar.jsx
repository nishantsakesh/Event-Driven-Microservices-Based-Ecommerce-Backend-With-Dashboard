import { motion } from "framer-motion";
import { Headphones, LayoutDashboard, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const links = [
        {
            name: "Products",
            path: "/products"
        },
        {
            name: "Technology",
            path: "/technology"
        },
        {
            name: "Experience",
            path: "/experience"
        },
        {
            name: "Support",
            path: "/support"
        }
    ];

    return (

        <motion.header

            initial={{
                y: -80,
                opacity: 0
            }}

            animate={{
                y: 0,
                opacity: 1
            }}

            transition={{
                duration: .8
            }}

            className="
            fixed
            top-0
            left-0
            right-0
            z-50"

        >

            <div
                className="
                max-w-[1500px]
                mx-auto
                px-8
                pt-4"
            >

                <nav

                    className="
                    h-16

                    rounded-full

                    border
                    border-white/10

                    bg-black/50

                    backdrop-blur-3xl

                    px-10

                    flex

                    items-center

                    justify-between"

                >

                    {/* LOGO */}

                    <Link

                        to="/"

                        className="
                        flex
                        items-center
                        gap-4"

                    >

                        <div

                            className="
                            w-11
                            h-11

                            rounded-full

                            border
                            border-white/10

                            flex

                            justify-center

                            items-center"

                        >

                            <Headphones size={18}/>

                        </div>

                        <div>

                            <h2

                                className="
                                text-lg
                                font-semibold
                                tracking-[8px]"

                            >

                                AUDIOHUB

                            </h2>

                        </div>

                    </Link>

                    {/* MENU */}

                    <div

                        className="
                        hidden

                        lg:flex

                        items-center

                        gap-12"

                    >

                        {

                            links.map(link=>(

                                <Link

                                    key={link.name}

                                    to={link.path}

                                    className="
                                    text-gray-400

                                    hover:text-white

                                    duration-300

                                    transition"

                                >

                                    {link.name}

                                </Link>

                            ))

                        }

                    </div>

                    {/* RIGHT */}

                    <div

                        className="
                        flex
                        items-center
                        gap-5"

                    >

                        <button

                            onClick={() => navigate("/products")}
                            aria-label="Search products"
                            className="
                            w-10
                            h-10

                            rounded-full

                            flex

                            items-center

                            justify-center

                            hover:bg-white/10

                            transition"

                        >

                            <Search size={18}/>

                        </button>

                        <button

                            onClick={() => navigate(token ? "/admin" : "/login")}
                            aria-label={token ? "Open dashboard" : "Open login"}
                            className="
                            w-10
                            h-10

                            rounded-full

                            flex

                            items-center

                            justify-center

                            hover:bg-white/10

                            transition"

                        >

                            {token ? <LayoutDashboard size={18}/> : <User size={18}/>}

                        </button>

                        <button

                            onClick={() => navigate(token ? "/admin" : "/login")}
                            className="
                            h-11

                            px-7

                            rounded-full

                            bg-white

                            text-black

                            font-semibold

                            hover:scale-105

                            duration-300

                            transition"

                        >

                            {token ? "Dashboard" : "Login"}

                        </button>

                    </div>

                </nav>

            </div>

        </motion.header>

    );

}

export default Navbar;
