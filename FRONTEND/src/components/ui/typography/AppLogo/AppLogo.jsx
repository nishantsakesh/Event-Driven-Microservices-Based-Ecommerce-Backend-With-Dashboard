import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

const sizes = {
    sm: {
        container: "h-8 w-8 text-sm",
        title: "text-base",
        subtitle: "text-[10px]",
    },
    md: {
        container: "h-10 w-10 text-lg",
        title: "text-lg",
        subtitle: "text-xs",
    },
    lg: {
        container: "h-14 w-14 text-2xl",
        title: "text-2xl",
        subtitle: "text-sm",
    },
};

function LogoContent({
    size,
    showText,
}) {
    const current = sizes[size];

    return (
        <div className="flex items-center gap-3">

            <div
                className={clsx(
                    "flex items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground",
                    current.container
                )}
            >
                A
            </div>

            {showText && (
                <div>

                    <h1
                        className={clsx(
                            "font-bold leading-none",
                            current.title
                        )}
                    >
                        AudioHub
                    </h1>

                    <p
                        className={clsx(
                            "text-muted-foreground",
                            current.subtitle
                        )}
                    >
                        Audio Marketplace
                    </p>

                </div>
            )}

        </div>
    );
}

LogoContent.propTypes = {
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
    ]),
    showText: PropTypes.bool,
};

export default function AppLogo({
    size = "md",
    showText = true,
    clickable = false,
}) {
    if (clickable) {
        return (
            <Link to="/">
                <LogoContent
                    size={size}
                    showText={showText}
                />
            </Link>
        );
    }

    return (
        <LogoContent
            size={size}
            showText={showText}
        />
    );
}

AppLogo.propTypes = {
    size: PropTypes.oneOf([
        "sm",
        "md",
        "lg",
    ]),
    showText: PropTypes.bool,
    clickable: PropTypes.bool,
};