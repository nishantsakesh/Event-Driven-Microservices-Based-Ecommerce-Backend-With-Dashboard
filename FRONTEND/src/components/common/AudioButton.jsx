import clsx from "clsx";

function AudioButton({

    children,
    variant = "primary",
    className = "",
    ...props

}) {

    return (

        <button

            {...props}

            className={clsx(

                `
                inline-flex
                items-center
                justify-center

                rounded-full

                px-8
                py-4

                text-sm

                font-semibold

                tracking-wide

                transition-all

                duration-300

                active:scale-95
                `,

                variant === "primary"

                    ? `
                    bg-white
                    text-black

                    hover:bg-[#d4af37]
                    hover:text-black
                    hover:scale-105
                    `

                    : `
                    border
                    border-white/20

                    bg-transparent

                    text-white

                    hover:bg-white
                    hover:text-black
                    hover:scale-105
                    `,

                className

            )}

        >

            {children}

        </button>

    );

}

export default AudioButton;