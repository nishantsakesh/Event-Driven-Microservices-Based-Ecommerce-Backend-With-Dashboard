import { Headphones, ShieldCheck, Truck } from "lucide-react";

function Features() {

    const data = [

        {
            icon: <Headphones size={34} />,
            title: "Studio Quality",
            desc: "Every product is tuned for exceptional clarity."
        },

        {
            icon: <ShieldCheck size={34} />,
            title: "2 Year Warranty",
            desc: "Premium support with hassle-free replacement."
        },

        {
            icon: <Truck size={34} />,
            title: "Fast Delivery",
            desc: "Quick shipping across India."
        }

    ];

    return (

        <section className="py-32 bg-white">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-5xl font-bold text-center">

                    Why AudioHub

                </h2>

                <p className="text-center text-gray-500 mt-5">

                    Crafted to deliver an unforgettable listening experience.

                </p>

                <div className="grid md:grid-cols-3 gap-10 mt-20">

                    {

                        data.map((item,index)=>(

                            <div

                                key={index}

                                className="rounded-[35px] bg-gray-50 p-10 hover:shadow-2xl transition"

                            >

                                {item.icon}

                                <h3 className="text-2xl font-bold mt-8">

                                    {item.title}

                                </h3>

                                <p className="text-gray-500 mt-4">

                                    {item.desc}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Features;