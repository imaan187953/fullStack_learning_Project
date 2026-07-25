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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1">

        {[...Array(10)].map((_, index) => {
          const rating = index + 1;

          return (
            <button
              key={rating}
              type="button"
              disabled={!editable || loading}
              onMouseEnter={() =>
                editable && setHoverValue(rating)
              }
              onMouseLeave={() =>
                editable && setHoverValue(0)
              }
              onClick={() =>
                editable &&
                !loading &&
                onChange(rating)
              }
              className={`transition-all duration-200

                ${
                  editable
                    ? "hover:scale-125 cursor-pointer"
                    : "cursor-default"
                }

                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              <Star
                size={30}
                stroke="#facc15"
                fill={
                  rating <= displayValue
                    ? "#facc15"
                    : "transparent"
                }
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">

        <p className="text-lg font-semibold text-white">

          {displayValue > 0
            ? `${displayValue}/10`
            : "No Rating"}

        </p>

        {loading && (
          <p className="text-sm text-red-500">
            Saving...
          </p>
        )}

      </div>

    </div>
  );
}

export default StarRating;