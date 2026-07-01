import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import ProductShowcase from "../components/sections/ProductShowcase";
import Experience from "../components/sections/Experience";

function Landing() {

    return (

        <MainLayout>

            <Hero />

            <Features />

            <ProductShowcase />

            <Experience />

        </MainLayout>

    );

}

export default Landing;