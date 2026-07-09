function AudioText({

    children,
    className=""

}){

    return(

        <p

            className={`
            text-gray-400
            leading-9
            text-lg
            ${className}
            `}

        >

            {children}

        </p>

    );

}

export default AudioText;