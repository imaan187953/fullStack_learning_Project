import { useCallback, useEffect, useState } from "react";

import SearchBar from "../../components/search/SearchBar";
import SearchResults from "../../components/search/SearchResults";

import {
  searchMovies,
  searchTVShows,
} from "../../services/media.service";

function Search() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      let data;

      if (type === "movie") {
        data = await searchMovies(query);

        setResults(
          (data.results || []).map((movie) => ({
            ...movie,
            media_type: "movie",
          }))
        );
      } else {
        data = await searchTVShows(query);

        setResults(
          (data.results || []).map((tv) => ({
            ...tv,
            media_type: "tv",
          }))
        );
      }
    } catch (err) {
      console.error(err);

      setError("Failed to search.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query, type]);

  /*
    Debounced search
    Wait 500ms after typing stops.
  */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("");
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, type, handleSearch]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* Header */}
        <header className="mb-7 sm:mb-9">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Search
          </h1>

          <p className="mt-2 max-w-xl text-sm text-zinc-400 sm:text-base">
            Search millions of movies and TV shows.
          </p>
        </header>

        {/* Search */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          onSearch={handleSearch}
        />

        {/* Results */}
        <SearchResults
          results={results}
          loading={loading}
          error={error}
        />

      </div>
    </main>
  );
}

export default Search;