import {

    AudioCard,
    AudioButton,
    AudioImage,
    AudioText

} from "../../common";

import {

    formatCurrency,
    truncateText

} from "../../../utils";

import heroHeadphone from "../../../assets/images/hero/headphone.png";

function ProductCard({ product }) {
    const imageSrc = product.imageUrl
        ? `/products/${product.imageUrl}`
        : fallbackProduct;

    const valueLine = product.brand
        ? `${product.brand} ${product.category?.toLowerCase() || "audio"} selected for daily excellence.`
        : "A carefully selected audio essential for focused listening.";

    return (

        <AudioCard>

            <AudioImage

                src={imageSrc}

                alt={product.name}

                className="h-72 object-contain mx-auto"

            />

            <h3 className="text-3xl font-bold mt-10">

                {product.name}

            </h3>

            <AudioText>

                {truncateText(product.description || valueLine, 96)}

            </AudioText>

            <div className="mt-8 flex justify-between items-center">

                <h2 className="text-3xl font-black">

                    {formatCurrency(product.price)}

                </h2>

                <AudioButton>

                    Explore

                </AudioButton>

            </div>

        </AudioCard>

    );

}

export default ProductCard;
