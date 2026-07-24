import { Search } from "lucide-react";

function SearchBar({
  query,
  setQuery,
  type,
  setType,
  onSearch,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-4 md:flex-row">

        {/* Search Input */}
        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
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
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white outline-none transition focus:border-red-500"
          />

        </div>

        {/* Media Type */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 text-white outline-none focus:border-red-500"
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
          onClick={onSearch}
          className="rounded-xl bg-red-600 px-8 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Search
        </button>

      </div>
    </div>
  );
}

export default SearchBar;