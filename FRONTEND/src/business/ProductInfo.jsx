import Price from "./Price";
import Rating from "./Rating";

export default function ProductInfo({
    product,
}) {
    return (
        <>

            <h1 className="text-4xl font-bold">
                {product.name}
            </h1>

            <div className="mt-3">

                <Rating
                    value={product.rating}
                    reviews={product.reviewCount}
                />

            </div>

            <div className="mt-5">

                <Price
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                />

            </div>

        </>
    );
}