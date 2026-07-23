import AppButton from "../common/AppButton";

export default function ProductActions() {
    return (
        <div className="mt-6 flex gap-3">

            <AppButton className="flex-1">
                Add to Cart
            </AppButton>

            <AppButton
                variant="secondary"
                className="flex-1"
            >
                Buy Now
            </AppButton>

        </div>
    );
}