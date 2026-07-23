import {
    BarChart3,
    Box,
    CreditCard,
    Home,
    Package,
    Settings,
    ShoppingCart,
    User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
    {
        title: "Dashboard",
        icon: Home,
        path: "/",
    },
    {
        title: "Products",
        icon: Package,
        path: "/products",
    },
    {
        title: "Categories",
        icon: Box,
        path: "/categories",
    },
    {
        title: "Orders",
        icon: ShoppingCart,
        path: "/orders",
    },
    {
        title: "Payments",
        icon: CreditCard,
        path: "/payments",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics",
    },
    {
        title: "Profile",
        icon: User,
        path: "/profile",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

export default function Sidebar() {
    return (
        <aside className="hidden w-64 border-r bg-background lg:block">

            <nav className="flex flex-col gap-2 p-4">

                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span>{item.title}</span>

                        </NavLink>
                    );
                })}

            </nav>

        </aside>
    );
}