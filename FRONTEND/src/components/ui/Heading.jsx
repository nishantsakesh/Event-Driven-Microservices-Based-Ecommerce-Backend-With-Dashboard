function Heading({
  badge,
  title,
  subtitle,
  center = true,
}) {
  return (
    <div
      className={`${
        center ? "text-center" : ""
      }`}
    >
      {badge && (
        <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-5 py-2 text-sm text-orange-400">
          {badge}
        </span>
      )}

      <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Heading;