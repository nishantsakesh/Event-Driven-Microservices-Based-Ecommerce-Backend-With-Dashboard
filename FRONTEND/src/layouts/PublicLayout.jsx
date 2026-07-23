import { Outlet } from "react-router-dom";

import BackgroundGlow from "../components/background/BackgroundGlow";
import GridPattern from "../components/background/GridPattern";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function PublicLayout() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white">

            <GridPattern />
            <BackgroundGlow />

            <Navbar />

            <main className="relative z-10 pt-32">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}