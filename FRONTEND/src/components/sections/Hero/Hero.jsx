import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

function Hero() {

    return (

        <section
            className="
            relative
            overflow-hidden
            bg-black"
        >

            {/* Background Glow */}

            <div
                className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_75%_35%,rgba(212,175,55,.15),transparent_45%)]"
            />

            {/* Watermark */}

            <h1
                className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                text-[18vw]
                font-black
                tracking-tight
                text-white/[0.03]
                whitespace-nowrap
                select-none"
            >
                AUDIOHUB
            </h1>

            <div
                className="
                relative
                z-10

                max-w-[1500px]
                mx-auto

                px-8
                lg:px-16

                pt-36
                lg:pt-40

                pb-16

                min-h-screen

                grid
                lg:grid-cols-2
                items-center
                gap-20"
            >

                <div>

                    <HeroContent />

                    <HeroStats />

                </div>

                <HeroImage />

            </div>

        </section>

    );

}

export default Hero;