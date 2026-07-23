import PageSection from "../layout/PageSection";

import ProductGrid from "../products/ProductGrid";

import { products } from "../../constants/products";

export default function FeaturedProducts(){

    return(

        <PageSection

            title="Featured Products"

            subtitle="Our best selling premium audio products."

        >

            <ProductGrid

                products={products}

            />

        </PageSection>

    );

}