import {

    AudioSection,
    AudioHeading,
    AudioLoader,
    AudioEmpty,
    AudioError

} from "../../common";

import useProducts from "../../../hooks/useProducts";

import ProductGrid from "./ProductGrid";

function FeaturedProducts() {

    const {

        products,

        loading,

        error

    } = useProducts();

    return (

        <AudioSection className="bg-[#050505]">

            <AudioHeading

                center

                eyebrow="Featured"

                title="Curated Collection"

                subtitle="Handpicked products engineered for exceptional sound."

            />

            {

                loading &&

                <AudioLoader/>

            }

            {

                error &&

                <AudioError/>

            }

            {

                !loading &&
                !error &&
                products.length===0 &&

                <AudioEmpty/>

            }

            {

                !loading &&
                !error &&
                products.length>0 &&

                <ProductGrid

                    products={products}

                />

            }

        </AudioSection>

    );

}

export default FeaturedProducts;