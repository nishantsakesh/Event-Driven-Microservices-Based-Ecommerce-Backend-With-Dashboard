import { cva } from "class-variance-authority";

const captionVariants = cva(
    "text-xs leading-relaxed",
    {
        variants: {
            variant: {
                default: "text-muted-foreground",

                primary: "text-primary",

                success: "text-green-600 dark:text-green-500",

                warning: "text-yellow-600 dark:text-yellow-500",

                destructive: "text-destructive",
            },

            weight: {
                normal: "font-normal",

                medium: "font-medium",

                semibold: "font-semibold",
            },

            align: {
                left: "text-left",

                center: "text-center",

                right: "text-right",
            },

            truncate: {
                true: "truncate",

                false: "",
            },
        },

        defaultVariants: {
            variant: "default",

            weight: "normal",

            align: "left",

            truncate: false,
        },
    }
);

export default captionVariants;