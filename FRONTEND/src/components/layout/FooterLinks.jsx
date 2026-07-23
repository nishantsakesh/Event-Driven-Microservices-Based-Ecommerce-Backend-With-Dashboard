const links = [
    "Products",
    "About",
    "Support",
    "Privacy",
];

export default function FooterLinks() {
    return (
        <div className="flex flex-wrap gap-8">
            {links.map((link) => (
                <a
                    key={link}
                    href="#"
                    className="text-slate-400 hover:text-white"
                >
                    {link}
                </a>
            ))}
        </div>
    );
}