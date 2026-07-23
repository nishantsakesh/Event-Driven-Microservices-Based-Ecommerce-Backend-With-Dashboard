import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

export default function AppDrawer({
    trigger,
    title,
    side = "right",
    children,
}) {
    return (
        <Sheet>

            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>

            <SheetContent side={side}>

                <SheetHeader>

                    <SheetTitle>
                        {title}
                    </SheetTitle>

                </SheetHeader>

                <div className="mt-6">
                    {children}
                </div>

            </SheetContent>

        </Sheet>
    );
}