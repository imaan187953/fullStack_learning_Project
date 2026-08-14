import {
  Calendar,
  Tv,
  Star,
  Layers,
} from "lucide-react";

const BACKDROP =
  "https://image.tmdb.org/t/p/original";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

function TVHero({
  tv,
  onAddToList,
}) {
  if (!tv) return null;

  const rating = Number(tv.voteAverage || 0);

  return (
    <section className="relative w-full overflow-hidden">

      {/* =========================
          BACKDROP
      ========================= */}

      <div className="relative h-[45vh] min-h-[280px] max-h-[520px] w-full sm:h-[50vh] lg:h-[65vh]">

        {tv.backdropPath ? (
          <img
            src={`${BACKDROP}${tv.backdropPath}`}
            alt={tv.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-black/20" />

      </div>


      {/* =========================
          HERO CONTENT
      ========================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          -mt-24
          w-full
          max-w-7xl
          px-4
          pb-10
          sm:-mt-32
          sm:px-6
          sm:pb-14
          lg:-mt-52
          lg:px-8
          lg:pb-16
        "
      >

        <div
          className="
            flex
            min-w-0
            flex-col
            gap-6
            sm:gap-8
            lg:flex-row
            lg:items-end
            lg:gap-10
          "
        >

          {/* =========================
              POSTER
          ========================= */}

          <div className="shrink-0">

            <img
              src={`${POSTER}${tv.posterPath}`}
              alt={tv.title}
              className="
                h-auto
                w-40
                rounded-xl
                object-cover
                shadow-2xl
                sm:w-48
                md:w-56
                lg:w-64
              "
            />

          </div>


          {/* =========================
              DETAILS
          ========================= */}

          <div className="min-w-0 flex-1 text-white">

            {/* Title */}

            <h1
              className="
                mb-4
                break-words
                text-3xl
                font-bold
                leading-tight
                sm:text-4xl
                lg:text-5xl
              "
            >
              {tv.title}
            </h1>


            {/* =========================
                GENRES
            ========================= */}

            {tv.genres?.length > 0 && (
              <div className="mb-5 flex max-w-full flex-wrap gap-2">

                {tv.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full
                      bg-red-600
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                      sm:px-4
                      sm:py-2
                      sm:text-sm
                    "
                  >
                    {genre.name}
                  </span>
                ))}

              </div>
            )}


            {/* =========================
                STATS
            ========================= */}

            <div
              className="
                mb-6
                grid
                grid-cols-2
                gap-3
                text-sm
                text-gray-300
                sm:flex
                sm:flex-wrap
                sm:gap-x-6
                sm:gap-y-3
              "
            >

              {/* Release Date */}

              <div className="flex min-w-0 items-center gap-2">

                <Calendar
                  size={17}
                  className="shrink-0"
                />

                <span className="truncate">
                  {tv.releaseDate
                    ? tv.releaseDate.slice(0, 10)
                    : "Unknown"}
                </span>

              </div>


              {/* Seasons */}

              <div className="flex min-w-0 items-center gap-2">

                <Layers
                  size={17}
                  className="shrink-0"
                />

                <span>
                  {tv.numberOfSeasons || 0} Seasons
                </span>

              </div>


              {/* Status */}

              <div className="flex min-w-0 items-center gap-2">

                <Tv
                  size={17}
                  className="shrink-0"
                />

                <span className="truncate">
                  {tv.status || "Unknown"}
                </span>

              </div>


              {/* TMDB Rating */}

              <div className="flex items-center gap-2 text-yellow-400">

                <Star
                  size={17}
                  fill="currentColor"
                  className="shrink-0"
                />

                <span>
                  {rating.toFixed(1)}
                </span>

              </div>

            </div>


            {/* =========================
                OVERVIEW
            ========================= */}

            <div className="max-w-4xl">

              <h2
                className="
                  mb-2
                  text-xl
                  font-semibold
                  sm:text-2xl
                "
              >
                Overview
              </h2>

              <p
                className="
                  break-words
                  text-sm
                  leading-7
                  text-gray-300
                  sm:text-base
                  sm:leading-8
                  lg:text-lg
                "
              >
                {tv.overview ||
                  "No overview available."}
              </p>

            </div>


            {/* =========================
                ADD TO LIST
            ========================= */}

            <div className="mt-7 sm:mt-9">

              <button
                type="button"
                onClick={onAddToList}
                className="
                  w-full
                  rounded-xl
                  bg-red-600
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  active:scale-[0.98]
                  sm:w-auto
                  sm:text-base
                "
              >
                + Add To List
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default TVHero;