import { motion } from "framer-motion";

const stats = [

    {
        value: "40H",
        label: "Battery"
    },

    {
        value: "ANC",
        label: "Noise Cancellation"
    },

    {
        value: "Hi-Res",
        label: "Certified Audio"
    }

];

function HeroStats() {

    return (

        <motion.div

            initial={{
                opacity:0,
                y:25
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                delay:.5,
                duration:.7
            }}

            className="
            mt-16
            flex
            gap-10
            flex-wrap"

        >

            {

                stats.map(item=>(

                    <div

                        key={item.value}

                        className="
                        min-w-[120px]"

                    >

                        <h2

                            className="
                            text-3xl
                            font-bold"

                        >

                            {item.value}

                        </h2>

                        <p

                            className="
                            text-gray-500
                            mt-2"

                        >

                            {item.label}

                        </p>

                    </div>

                ))

            }

        </motion.div>

    );

}

export default HeroStats;