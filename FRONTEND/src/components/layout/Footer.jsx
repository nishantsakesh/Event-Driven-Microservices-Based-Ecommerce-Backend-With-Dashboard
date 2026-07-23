import Container from "../ui/Container";
import Divider from "../ui/Divider";
import Logo from "./Logo";
import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";

export default function Footer() {
    return (
        <footer className="mt-32 border-t border-white/10 py-16">

            <Container>

                <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

                    <div>

                        <Logo />

                        <p className="mt-4 max-w-md text-slate-400">
                            Premium audio marketplace built with
                            Spring Boot Microservices and React.
                        </p>

                    </div>

                    <FooterLinks />

                    <Newsletter />

                </div>

                <Divider className="my-10" />

                <p className="text-center text-slate-500">
                    © 2026 AudioHub. All rights reserved.
                </p>

            </Container>

        </footer>
    );
}