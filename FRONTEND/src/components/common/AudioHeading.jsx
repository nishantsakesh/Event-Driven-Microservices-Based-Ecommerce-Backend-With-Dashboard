function AudioHeading({

    eyebrow,

    title,

    subtitle,

    center = false

}) {

    return (

        <div
            className={center ? "text-center" : ""}
        >

            {

                eyebrow && (

                    <p
                        className="
                        uppercase
                        tracking-[8px]
                        text-gray-500
                        mb-5"
                    >

                        {eyebrow}

                    </p>

                )

            }

            <h2
                className="
                text-5xl
                lg:text-7xl
                font-black
                leading-tight"
            >

                {title}

            </h2>

            {

                subtitle && (

                    <p
                        className="
                        mt-8
                        text-gray-400
                        text-xl
                        max-w-2xl
                        leading-9
                        mx-auto"
                    >

                        {subtitle}

                    </p>

                )

            }

        </div>

    );

}

export default AudioHeading;