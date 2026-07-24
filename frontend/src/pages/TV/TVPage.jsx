import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTVDetails } from "../../services/media.service";

import TVHero from "../../components/tv/TVHero";
import AddToListModal from "../../components/list/AddToListModal";

function TVPage() {
  const { id } = useParams();

  const [tv, setTV] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        setLoading(true);

        const response = await getTVDetails(id);

        setTV(response.tv);

      } catch (error) {

        setError("Unable to load TV show.");

      } finally {

        setLoading(false);

      }
    };

    fetchTV();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading TV Show...
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

      <TVHero
        tv={tv}
        onAddToList={() =>
          setShowAddModal(true)
        }
      />

      <AddToListModal
        isOpen={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        tmdbId={tv.tmdbId}
        mediaType="tv"
      />

    </main>
  );
}

export default TVPage;