import { Bell, Search } from "lucide-react";

import AppAvatar from "@/components/common/AppAvatar";
import AppInput from "@/components/common/AppInput";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 h-16 border-b bg-background/90 backdrop-blur">

            <div className="flex h-full items-center justify-between px-6">

                {/* Left */}

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                        A
                    </div>

                    <div>
                        <h1 className="text-lg font-bold">
                            AudioHub
                        </h1>

                        <p className="text-xs text-muted-foreground">
                            Audio Marketplace
                        </p>
                    </div>

                </div>

                {/* Center */}

                <div className="hidden w-full max-w-md lg:block">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />

                        <AppInput
                            placeholder="Search products..."
                            className="pl-10"
                        />

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    <button className="relative">

                        <Bell size={22} />

                        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />

                    </button>

                    <AppAvatar
                        fallback="NS"
                    />

                </div>

            </div>

        </header>
    );
}