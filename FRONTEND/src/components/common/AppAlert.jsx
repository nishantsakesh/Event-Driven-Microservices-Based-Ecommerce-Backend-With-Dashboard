import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../ui/alert";

export default function AppAlert({
    title,
    description,
}) {
    return (
        <Alert>

            <AlertTitle>
                {title}
            </AlertTitle>

            <AlertDescription>
                {description}
            </AlertDescription>

        </Alert>
    );
}