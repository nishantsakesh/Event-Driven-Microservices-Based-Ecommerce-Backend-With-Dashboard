import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero/Hero";
import FeaturedProducts from "../components/sections/FeaturedProducts/FeaturedProducts";
import Experience from "../components/sections/Experience";
import Features from "../components/sections/Features";

function Landing() {
    return (
        <MainLayout>
            <Hero />
            <FeaturedProducts />
            <Experience />
            <Features />
        </MainLayout>
    );
}

export default Landing;