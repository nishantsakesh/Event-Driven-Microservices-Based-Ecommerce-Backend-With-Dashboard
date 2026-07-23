export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 text-sm text-muted-foreground">

                <span>
                    © {new Date().getFullYear()} AudioHub
                </span>

                <span>
                    Built with React + Spring Boot
                </span>

            </div>
        </footer>
    );
}