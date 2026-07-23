import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default function AppDialog({
    trigger,
    title,
    description,
    children,
}) {
    return (
        <Dialog>

            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        {title}
                    </DialogTitle>

                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}

                </DialogHeader>

                {children}

            </DialogContent>

        </Dialog>
    );
}