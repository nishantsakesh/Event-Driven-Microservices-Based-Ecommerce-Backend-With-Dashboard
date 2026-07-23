export default function ProductImage({
    src,
    alt,
}) {
    return (
        <img
            src={src}
            alt={alt}
            className="aspect-square w-full rounded-2xl object-cover"
        />
    );
}