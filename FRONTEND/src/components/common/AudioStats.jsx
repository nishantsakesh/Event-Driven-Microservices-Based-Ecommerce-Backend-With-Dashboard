function AudioStats({

    value,

    label

}) {

    return (

        <div>

            <h2
                className="text-4xl font-black"
            >

                {value}

            </h2>

            <p
                className="text-gray-400 mt-2"
            >

                {label}

            </p>

        </div>

    );

}

export default AudioStats;