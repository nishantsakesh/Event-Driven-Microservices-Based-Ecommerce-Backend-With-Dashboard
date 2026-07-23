import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <PageContainer>
                    <Outlet />
                </PageContainer>

            </div>

            <Footer />

        </div>
    );
}