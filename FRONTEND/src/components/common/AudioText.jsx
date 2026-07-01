function AudioText({

    children,

    className = ""

}) {

    return (

        <p
            className={`text-gray-400 leading-8 ${className}`}
        >

            {children}

        </p>

    );

}

export default AudioText;