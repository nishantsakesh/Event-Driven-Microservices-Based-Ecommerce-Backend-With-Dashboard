function AudioModal({

    children,

    open

}){

    if(!open) return null;

    return(

        <div
            className="
            fixed
            inset-0
            bg-black/60
            flex
            justify-center
            items-center
            z-50"
        >

            <div
                className="
                bg-zinc-900
                rounded-[32px]
                p-10
                w-[500px]"
            >

                {children}

            </div>

        </div>

    );

}

export default AudioModal;