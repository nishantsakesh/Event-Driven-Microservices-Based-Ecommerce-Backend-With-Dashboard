import AppDialog from "./AppDialog";
import AppButton from "./AppButton";

export default function AppConfirmDialog({
    trigger,
    title,
    description,
    onConfirm,
}) {
    return (
        <AppDialog
            trigger={trigger}
            title={title}
            description={description}
        >

            <div className="mt-6 flex justify-end gap-3">

                <AppButton variant="ghost">
                    Cancel
                </AppButton>

                <AppButton
                    variant="danger"
                    onClick={onConfirm}
                >
                    Confirm
                </AppButton>

            </div>

        </AppDialog>
    );
}