import AppBadge from "../common/AppBadge";

export default function Price({
    price,
    originalPrice,
    discount,
}) {
    return (
        <div className="flex items-center gap-3">

            <span className="text-2xl font-bold">
                ₹{price}
            </span>

            {originalPrice && (
                <span className="text-slate-400 line-through">
                    ₹{originalPrice}
                </span>
            )}

            {discount && (
                <AppBadge variant="success">
                    {discount}% OFF
                </AppBadge>
            )}

        </div>
    );
}