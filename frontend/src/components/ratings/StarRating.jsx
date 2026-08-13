import { useState } from "react";
import { Star } from "lucide-react";

function StarRating({
  value = 0,
  editable = false,
  loading = false,
  onChange,
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || value;

  const handleMouseEnter = (rating) => {
    if (editable && !loading) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverValue(0);
    }
  };

  const handleClick = (rating) => {
    if (editable && !loading && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="space-y-3">

      {/* Stars */}

      <div
        className="
          flex
          items-center
          gap-0.5
          sm:gap-1
        "
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(10)].map((_, index) => {
          const rating = index + 1;

          const isActive =
            rating <= displayValue;

          return (
            <button
              key={rating}
              type="button"
              disabled={!editable || loading}
              aria-label={`Rate ${rating} out of 10`}
              onMouseEnter={() =>
                handleMouseEnter(rating)
              }
              onFocus={() =>
                handleMouseEnter(rating)
              }
              onBlur={handleMouseLeave}
              onClick={() =>
                handleClick(rating)
              }
              className={`
                rounded-md
                p-0.5
                transition-all
                duration-150

                ${
                  editable && !loading
                    ? "cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                    : "cursor-default"
                }

                ${
                  loading
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              `}
            >
              <Star
                size={20}
                className={`
                  transition-colors
                  duration-150
                  sm:h-[24px]
                  sm:w-[24px]

                  ${
                    isActive
                      ? "text-yellow-400"
                      : "text-zinc-700"
                  }
                `}
                fill={
                  isActive
                    ? "currentColor"
                    : "transparent"
                }
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>

      {/* Value */}

      <div className="flex items-center justify-between gap-4">

        <p className="text-sm font-semibold text-white sm:text-base">
          {displayValue > 0 ? (
            <>
              <span className="text-yellow-400">
                {displayValue}
              </span>
              <span className="text-zinc-500">
                /10
              </span>
            </>
          ) : (
            <span className="text-zinc-500">
              No rating
            </span>
          )}
        </p>

        {loading && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Saving...
          </div>
        )}

      </div>
    </div>
  );
}

export default StarRating;