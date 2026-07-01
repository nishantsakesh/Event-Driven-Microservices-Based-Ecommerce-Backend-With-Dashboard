function AudioFlex({

    children,

    justify = "between",

    align = "center",

    className = ""

}) {

    const justifyMap = {

        between: "justify-between",

        center: "justify-center",

        start: "justify-start",

        end: "justify-end"

    };

    const alignMap = {

        center: "items-center",

        start: "items-start",

        end: "items-end"

    };

    return (

        <div
            className={`
                flex
                ${justifyMap[justify]}
                ${alignMap[align]}
                ${className}
            `}
        >

            {children}

        </div>

    );

}

export default AudioFlex;