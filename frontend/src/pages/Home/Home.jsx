import { useState, useEffect } from "react";

import HeroSection from "../../components/home/HeroSection";
import MyListsSection from "../../components/home/MyListsSection";
import Footer from "../../components/layout/Footer";
import TrendingSection from "../Landing/TrendingSection";
import Navbar from "../../components/layout/Navbar";

import {
  getTrendingMovies,
  getTrendingTV,
} from "../../services/media.service";

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [movieResponse, tvResponse] = await Promise.all([
          getTrendingMovies(),
          getTrendingTV(),
        ]);

        setMovies(movieResponse.results);
        setTvShows(tvResponse.results);
      } catch (error) {
        console.error("Failed to load home page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-sm text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl space-y-8 px-3 pb-8 pt-18 sm:space-y-10 sm:px-5 sm:pb-10 sm:pt-20 md:px-6 lg:space-y-14 lg:px-8 lg:pb-14">
        {/* Hero */}
        <HeroSection />

        {/* My Lists */}
        <MyListsSection />

        {/* Trending Movies */}
        <TrendingSection
          title="Trending Movies"
          movies={movies}
        />

        {/* Trending TV */}
        <TrendingSection
          title="Trending TV Shows"
          movies={tvShows}
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Home;
