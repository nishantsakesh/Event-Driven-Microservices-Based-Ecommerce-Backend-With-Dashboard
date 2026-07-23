import Container from "../ui/Container";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import SearchButton from "./SearchButton";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function Navbar() {
    return (
        <header className="fixed left-0 top-0 z-50 w-full">

            <Container>

                <div className="mt-5 flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-6 backdrop-blur-xl">

                    <Logo />

                    <DesktopNav />

                    <div className="flex items-center gap-5">

                        <SearchButton />

                        <UserMenu />

                        <MobileNav />

                    </div>

                </div>

            </Container>

        </header>
    );
}