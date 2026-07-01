function AudioBadge({

    children

}) {

    return (

        <span

            className="
                inline-block
                px-5
                py-2
                rounded-full
                border
                border-white/20
                text-sm
                tracking-widest
                uppercase
                text-gray-400"

        >

            {children}

        </span>

    );

}

export default AudioBadge;