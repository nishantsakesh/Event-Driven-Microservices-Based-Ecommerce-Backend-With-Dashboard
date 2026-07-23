import AppCard from "../common/AppCard";
import AppButton from "../common/AppButton";

export default function CartSummary({
    subtotal,
    shipping,
    total,
}) {
    return (
        <AppCard variant="glass">

            <h3 className="text-xl font-semibold">
                Order Summary
            </h3>

            <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                </div>

                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

            </div>

            <AppButton
                className="mt-6 w-full"
            >
                Checkout
            </AppButton>

        </AppCard>
    );
}