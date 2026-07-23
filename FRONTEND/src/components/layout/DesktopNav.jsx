import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

export default function DesktopNav() {
    return (
        <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
                <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                        `transition ${
                            isActive
                                ? "text-orange-400"
                                : "text-slate-300 hover:text-white"
                        }`
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}