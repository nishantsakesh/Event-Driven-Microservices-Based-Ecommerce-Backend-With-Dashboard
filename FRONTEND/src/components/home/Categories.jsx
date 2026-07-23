import PageSection from "../layout/PageSection";
import Card from "../common/AppCard";

import { categories } from "../../constants/categories";

export default function Categories() {
    return (
        <PageSection
            title="Browse Categories"
        >

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {categories.map((category) => (

                    <Card
                        key={category}
                        className="cursor-pointer text-center transition hover:border-orange-500 hover:-translate-y-2"
                    >
                        <h3 className="text-2xl font-semibold">
                            {category}
                        </h3>
                    </Card>

                ))}

            </div>

        </PageSection>
    );
}