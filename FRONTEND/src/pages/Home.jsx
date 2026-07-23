import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Brands from "../components/home/Brands";
import Features from "../components/home/Features";
import Categories from "../components/home/Categories";
import CTA from "../components/home/CTA";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Home() {
    return (
        <>
            <Hero />

            <Stats />

            <Brands />

            <Features />

            <Categories />

            <FeaturedProducts/>

            <CTA />
        </>
    );
}