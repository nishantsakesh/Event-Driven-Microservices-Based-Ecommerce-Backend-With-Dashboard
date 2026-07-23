import AppBadge from "../common/AppBadge";
import AppButton from "../common/AppButton";
import FadeIn from "../animations/FadeIn";

export default function HeroContent() {
    return (
        <FadeIn>

            <AppBadge>
                Premium Audio Marketplace
            </AppBadge>

            <h1 className="mt-8 text-6xl font-black leading-tight lg:text-7xl">
                Experience
                <br />
                Sound Like
                <br />
                Never Before.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
                Shop premium headphones, speakers, microphones,
                gaming gear and studio equipment from the world's
                leading brands.
            </p>

            <div className="mt-10 flex gap-4">

                <AppButton>
                    Shop Now
                </AppButton>

                <AppButton variant="secondary">
                    Browse Products
                </AppButton>

            </div>

        </FadeIn>
    );
}