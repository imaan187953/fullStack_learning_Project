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
        items-center
        gap-4
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-4
        text-left
        transition-all
        duration-300
        hover:border-red-600
        hover:bg-zinc-800
        active:scale-[0.99]
        sm:items-start
        sm:gap-5
        sm:p-6
      "
    >

      {/* Icon */}
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-red-600/20
          text-red-500
          transition-all
          duration-300
          group-hover:scale-105
          sm:h-14
          sm:w-14
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">

        <h3 className="text-base font-semibold text-white sm:text-xl">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-gray-400 sm:mt-2 sm:text-sm sm:leading-7">
          {description}
        </p>

      </div>

    </button>
  );
}

export default ActionCard;