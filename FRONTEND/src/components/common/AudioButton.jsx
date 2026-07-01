function AudioButton({

    children,

    variant = "primary",

    onClick

}) {

    const styles = {

        primary:

            "bg-white text-black",

        secondary:

            "border border-white/20 text-white bg-transparent"

    };

    return (

        <button

            onClick={onClick}

            className={`
            px-8
            py-4
            rounded-full
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            ${styles[variant]}
            `}

        >

            {children}

        </button>

    );

}

export default AudioButton;