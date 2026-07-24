import { useEffect, useState } from "react";

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

  const handleSearch = async () => {

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
      } else {
        data = await searchTVShows(query);
      }

      setResults(data.results || []);

    } catch (err) {

      console.error(err);

      setError("Failed to search.");

      setResults([]);

    } finally {

      setLoading(false);

    }

  };

  /*
      Debounce Search
      Wait 500ms after typing stops.
  */

  useEffect(() => {

    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {

      handleSearch();

    }, 500);

    return () => clearTimeout(timer);

  }, [query, type]);

  return (
    <div className="min-h-screen bg-zinc-950">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <h1 className="text-4xl font-bold text-white">
          Search
        </h1>

        <p className="mt-2 mb-10 text-zinc-400">
          Search millions of Movies and TV Shows.
        </p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          onSearch={handleSearch}
        />

        <SearchResults
          results={results}
          loading={loading}
          error={error}
        />

      </div>

    </div>
  );
}

export default Search;