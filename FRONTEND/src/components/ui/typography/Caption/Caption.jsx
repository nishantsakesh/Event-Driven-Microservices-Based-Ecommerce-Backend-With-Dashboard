import PropTypes from "prop-types";
import clsx from "clsx";

import captionVariants from "./captionVariants";

export default function Caption({
    as: Component = "p",
    variant,
    weight,
    align,
    truncate,
    className,
    children,
    ...props
}) {
    return (
        <Component
            className={clsx(
                captionVariants({
                    variant,
                    weight,
                    align,
                    truncate,
                }),
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

Caption.propTypes = {
    as: PropTypes.elementType,

    variant: PropTypes.oneOf([
        "default",
        "primary",
        "success",
        "warning",
        "destructive",
    ]),

    weight: PropTypes.oneOf([
        "normal",
        "medium",
        "semibold",
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