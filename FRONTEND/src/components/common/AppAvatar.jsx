import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar";

export default function AppAvatar({
    src,
    fallback = "AH",
}) {
    return (
        <Avatar>

            <AvatarImage src={src} />

            <AvatarFallback>
                {fallback}
            </AvatarFallback>

        </Avatar>
    );
}