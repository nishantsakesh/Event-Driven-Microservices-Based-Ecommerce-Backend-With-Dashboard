import AppButton from "./AppButton";

export default function AppPagination({
    page,
    totalPages,
    onPrevious,
    onNext,
}) {
    return (
        <div className="flex items-center justify-center gap-4">

            <AppButton
                variant="outline"
                onClick={onPrevious}
                disabled={page === 1}
            >
                Previous
            </AppButton>

            <span>
                {page} / {totalPages}
            </span>

            <AppButton
                variant="outline"
                onClick={onNext}
                disabled={page === totalPages}
            >
                Next
            </AppButton>

        </div>
    );
}