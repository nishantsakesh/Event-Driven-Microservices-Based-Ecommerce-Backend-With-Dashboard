import hero from "../../assets/hero.png";

import ScaleIn from "../animations/ScaleIn";

export default function HeroImage() {
    return (
        <ScaleIn>

            <img
                src={hero}
                alt="Hero"
                className="mx-auto w-full max-w-xl drop-shadow-[0_30px_80px_rgba(0,0,0,.45)]"
            />

        </ScaleIn>
    );
}