function SectionTitle({ title, subtitle }) {

    return (

        <div className="mb-20">

            <p
                className="text-gray-400 uppercase tracking-[6px]"
            >
                {subtitle}
            </p>

            <h2
                className="text-6xl font-bold mt-4"
            >
                {title}
            </h2>

        </div>

    );

}

export default SectionTitle;