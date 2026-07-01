function AudioCard({

    children,

    className = ""

}) {

    return (

        <div

            className={`
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-10
            transition
            hover:border-white/20
            hover:shadow-2xl
            ${className}
            `}

        >

            {children}

        </div>

    );

}

export default AudioCard;