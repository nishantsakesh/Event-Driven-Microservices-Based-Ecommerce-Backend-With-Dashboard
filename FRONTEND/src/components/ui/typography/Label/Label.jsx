import PropTypes from "prop-types";
import clsx from "clsx";

export default function Label({
    htmlFor,
    required = false,
    optional = false,
    disabled = false,
    className,
    children,
    ...props
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(
                "mb-2 inline-flex items-center gap-1 text-sm font-medium",
                disabled && "cursor-not-allowed opacity-60",
                className
            )}
            {...props}
        >
            <span>{children}</span>

            {required && (
                <span
                    className="text-destructive"
                    aria-hidden="true"
                >
                    *
                </span>
            )}

            {!required && optional && (
                <span className="text-xs text-muted-foreground">
                    (Optional)
                </span>
            )}
        </label>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.string,
    required: PropTypes.bool,
    optional: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};