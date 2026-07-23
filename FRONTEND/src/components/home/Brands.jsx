import PageSection from "../layout/PageSection";
import { brands } from "../../constants/brands";



export default function Brands() {
    return (
        <PageSection
            title="Trusted by the world's best brands"
        >

            <div className="grid grid-cols-2 gap-8 text-center text-2xl font-bold text-slate-500 md:grid-cols-3 lg:grid-cols-6">

                {brands.map((brand) => (

                    <div key={brand}>
                        {brand}
                    </div>

                ))}

            </div>

        </PageSection>
    );
}