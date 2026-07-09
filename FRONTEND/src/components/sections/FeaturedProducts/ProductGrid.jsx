import ProductCard from "./ProductCard";

function ProductGrid({

    products

}) {

    return (

        <div

            className="grid lg:grid-cols-3 gap-10"

        >

            {

                products.map(product => (

                    <ProductCard

                        key={product.id}

                        product={product}

                    />

                ))

            }

        </div>

    );

}

export default ProductGrid;