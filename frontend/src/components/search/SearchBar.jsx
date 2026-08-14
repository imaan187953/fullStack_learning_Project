import { Search } from "lucide-react";

function SearchBar({
  query,
  setQuery,
  type,
  setType,
  onSearch,
}) {
  return (
    <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-5">

      <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row">

        {/* Search Input */}
        <div className="relative min-w-0 flex-1">

          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            value={query}
            placeholder="Search movies or TV shows..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="
              w-full
              rounded-xl
              border border-zinc-700
              bg-zinc-800
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-red-600
              focus:ring-1
              focus:ring-red-600
              sm:text-base
            "
          />

        </div>

        {/* Media Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="
            w-full
            rounded-xl
            border border-zinc-700
            bg-zinc-800
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-red-600
            focus:ring-1
            focus:ring-red-600
            sm:text-base
            lg:w-40
            lg:shrink-0
          "
        >
          <option value="movie">
            Movies
          </option>

          <option value="tv">
            TV Shows
          </option>
        </select>

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
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
            sm:text-base
            lg:w-auto
            lg:shrink-0
          "
        >
          Search
        </button>

      </div>
    </section>
  );
}

export default SearchBar;