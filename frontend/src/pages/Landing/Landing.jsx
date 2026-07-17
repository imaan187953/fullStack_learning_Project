import { useState, useEffect } from "react";

import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import { getTrendingMovies } from "../../services/media.service";

function Landing() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black">
      <Navbar />

      <HeroSection movie={movies[0]} />
    </div>
  );
}

export default Landing;