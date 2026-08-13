import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../../services/media.service";

import MovieHero from "../../components/movie/MovieHero";
import AddToListModal from "../../components/list/AddToListModal";

import MediaTabs from "../../components/media/MediaTabs";
import InteractionSection from "../../components/interaction/InteractionSection";
import RatingSummary from "../../components/ratings/RatingSummary";
import ReviewsSection from "../../components/reviews/ReviewsSection";

function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMovieDetails(id);

        setMovie(response.movie);
      } catch (err) {
        console.error(err);
        setError("Unable to load movie.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-red-500" />

          <p className="text-sm text-zinc-400">
            Loading movie...
          </p>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-8 py-10 text-center">
          <p className="text-lg font-medium text-red-400">
            {error || "Movie not found."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <MovieHero
        movie={movie}
        onAddToList={() => setShowAddModal(true)}
      />

      {/* Tabs + Content */}
      <MediaTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        overview={
          <InteractionSection
            media={movie}
            mediaType="movie"
            onAddToList={() => setShowAddModal(true)}
            onRate={() => setActiveTab("ratings")}
            onReview={() => {
              setActiveTab("reviews");
              setShowReviewModal(true);
            }}
          />
        }
        reviews={
          <ReviewsSection
            mediaId={movie._id}
            showModal={showReviewModal}
            onCloseModal={() => setShowReviewModal(false)}
          />
        }
        ratings={
          <RatingSummary mediaId={movie._id} />
        }
      />

      {/* Add to List */}
      <AddToListModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        tmdbId={movie.tmdbId}
        mediaType="movie"
      />
    </main>
  );
}

export default MoviePage;