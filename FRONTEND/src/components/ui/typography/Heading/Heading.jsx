import PropTypes from "prop-types";
import clsx from "clsx";

const LEVEL_STYLES = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-bold tracking-tight",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
};

const ALIGNMENT = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

export default function Heading({
    level = 1,
    align = "left",
    truncate = false,
    className,
    children,
    ...props
}) {
    const Tag = `h${level}`;

    return (
        <Tag
            className={clsx(
                LEVEL_STYLES[level],
                ALIGNMENT[align],
                truncate && "truncate",
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    align: PropTypes.oneOf([
        "left",
        "center",
        "right",
    ]),
    truncate: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};