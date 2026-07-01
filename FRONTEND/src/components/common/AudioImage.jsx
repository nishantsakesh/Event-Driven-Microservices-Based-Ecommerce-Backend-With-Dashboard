import { Float } from "../animations";

function AudioImage({

    src,

    alt,

    className = "",

    floating = true

}) {

    const image = (

        <img

            src={src}

            alt={alt}

            className={className}

        />

    );

    if (floating) {

        return (

            <Float>

                {image}

            </Float>

        );

    }

    return image;

}

export default AudioImage;