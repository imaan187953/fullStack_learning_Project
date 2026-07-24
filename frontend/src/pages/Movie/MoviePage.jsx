import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../../services/media.service";

import MovieHero from "../../components/movie/MovieHero";
import AddToListModal from "../../components/list/AddToListModal";

function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const response = await getMovieDetails(id);

        setMovie(response.movie);

      } catch (err) {

        setError("Unable to load movie.");

      } finally {

        setLoading(false);

      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading movie...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">

      <MovieHero
        movie={movie}
        onAddToList={() =>
          setShowAddModal(true)
        }
      />

      <AddToListModal
        isOpen={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        tmdbId={movie.tmdbId}
        mediaType="movie"
      />

    </main>
  );
}

export default MoviePage;