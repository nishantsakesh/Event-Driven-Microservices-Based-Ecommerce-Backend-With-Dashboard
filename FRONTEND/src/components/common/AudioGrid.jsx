function AudioGrid({

    children,

    cols = 2,

    gap = "gap-20",

    className = ""

}) {

    const gridCols = {

        2: "lg:grid-cols-2",

        3: "lg:grid-cols-3",

        4: "lg:grid-cols-4"

    };

    return (

        <div
            className={`
                grid
                ${gridCols[cols]}
                ${gap}
                items-center
                ${className}
            `}
        >

            {children}

        </div>

    );

}

export default AudioGrid;