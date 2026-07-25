function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-start
        gap-5
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        text-left
        transition-all
        duration-300

        hover:border-red-600
        hover:bg-zinc-800
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          bg-red-600/20
          text-red-500
          transition-all
          duration-300

          group-hover:scale-110
        "
      >
        {icon}
      </div>

      {/* Text */}

      <div className="flex-1">

        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm leading-7 text-gray-400">
          {description}
        </p>

      </div>

    </button>
  );
}

export default ActionCard;