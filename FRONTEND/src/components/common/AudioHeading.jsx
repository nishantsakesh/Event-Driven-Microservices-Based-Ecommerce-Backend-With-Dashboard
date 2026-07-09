function AudioHeading({

    eyebrow,
    title,
    subtitle,
    center=false

}){

    return(

        <div
        className={
            center
            ?"text-center"
            :""
        }>

            {

                eyebrow&&

                <p

                    className="
                    uppercase
                    tracking-[12px]
                    text-sm
                    text-gray-500
                    mb-8"

                >

                    {eyebrow}

                </p>

            }

            <h1

                className="
                text-6xl
                lg:text-8xl
                font-black
                leading-none"

            >

                {title}

            </h1>

            {

                subtitle&&

                <p

                    className={`
                    mt-8
                    text-xl
                    text-gray-400
                    max-w-2xl
                    ${center ? "mx-auto" : ""}
                    `}

                >

                    {subtitle}

                </p>

            }

        </div>

    );

}

export default AudioHeading;
