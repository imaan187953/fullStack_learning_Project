function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/70
        p-5
        text-left
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-zinc-700
        hover:bg-zinc-900

        active:scale-[0.99]

        sm:p-6
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-red-500/10
          bg-red-500/10
          text-red-400
          transition
          duration-300

          group-hover:border-red-500/20
          group-hover:bg-red-500/15
          group-hover:text-red-300
        "
      >
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-zinc-500 transition group-hover:text-zinc-400">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <span className="hidden text-lg text-zinc-600 transition group-hover:translate-x-1 group-hover:text-zinc-400 sm:block">
        →
      </span>
    </button>
  );
}

export default ActionCard;