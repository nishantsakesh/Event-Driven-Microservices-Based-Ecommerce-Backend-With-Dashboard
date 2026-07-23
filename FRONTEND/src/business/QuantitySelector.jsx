import AppButton from "../common/AppButton";

export default function QuantitySelector({
    value,
    onIncrease,
    onDecrease,
}) {
    return (
        <div className="flex items-center gap-3">

            <AppButton
                size="sm"
                onClick={onDecrease}
            >
                -
            </AppButton>

            <span>{value}</span>

            <AppButton
                size="sm"
                onClick={onIncrease}
            >
                +
            </AppButton>

        </div>
    );
}