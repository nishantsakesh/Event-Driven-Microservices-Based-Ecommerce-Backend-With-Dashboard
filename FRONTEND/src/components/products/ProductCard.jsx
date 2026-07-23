import AppCard from "../common/AppCard";
import AppButton from "../common/AppButton";

export default function ProductCard({
    image,
    name,
    category,
    price,
}) {
    return (
        <AppCard className="group overflow-hidden p-0">

            <div className="overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-6">

                <p className="text-sm text-orange-400">
                    {category}
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                    {name}
                </h2>

                <div className="mt-6 flex items-center justify-between">

                    <h3 className="text-2xl font-bold">
                        ₹{price}
                    </h3>

                    <AppButton>
                        Buy
                    </AppButton>

                </div>

            </div>

        </AppCard>
    );
}