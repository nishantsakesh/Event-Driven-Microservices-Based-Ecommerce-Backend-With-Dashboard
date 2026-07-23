import ProductCard from "./ProductCard";

export default function ProductGrid({

    products,

}){

    return(

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {products.map(product=>(

                <ProductCard

                    key={product.id}

                    {...product}

                />

            ))}

        </div>

    );

}