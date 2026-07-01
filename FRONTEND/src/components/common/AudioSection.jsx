import AudioContainer from "./AudioContainer";

function AudioSection({
    children,
    className = ""
}) {

    return (

        <section
            className={`py-32 ${className}`}
        >

            <AudioContainer>

                {children}

            </AudioContainer>

        </section>

    );

}

export default AudioSection;