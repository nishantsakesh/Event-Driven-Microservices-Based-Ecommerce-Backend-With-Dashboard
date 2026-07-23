import PropTypes from "prop-types";
import clsx from "clsx";

const VARIANTS = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary",
    success: "text-green-600 dark:text-green-500",
    warning: "text-yellow-600 dark:text-yellow-500",
    destructive: "text-destructive",
};

const SIZES = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
};

const WEIGHTS = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

const ALIGNMENTS = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

export default function Text({
    as: Component = "p",
    variant = "default",
    size = "md",
    weight = "normal",
    align = "left",
    truncate = false,
    className,
    children,
    ...props
}) {
    return (
        <Component
            className={clsx(
                VARIANTS[variant],
                SIZES[size],
                WEIGHTS[weight],
                ALIGNMENTS[align],
                truncate && "truncate",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

Text.propTypes = {
    as: PropTypes.elementType,
    variant: PropTypes.oneOf([
        "default",
        "muted",
        "primary",
        "success",
        "warning",
        "destructive",
    ]),
    size: PropTypes.oneOf([
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
    ]),
    weight: PropTypes.oneOf([
        "normal",
        "medium",
        "semibold",
        "bold",
    ]),
    align: PropTypes.oneOf([
        "left",
        "center",
        "right",
    ]),
    truncate: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};