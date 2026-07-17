import { useState, useEffect } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "./HeroSection";
import TrendingSection from "./TrendingSection";
import CTASection from "./CTASection";
import FeaturesSection from "./FeaturesSection";

import {
    getTrendingMovies,
    getTrendingTV,
} from "../../services/media.service";

function Landing() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLandingData = async () => {
            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    getTrendingMovies(),
                    getTrendingTV(),
                ]);

                setMovies(movieResponse.results);
                setTvShows(tvResponse.results);
            } catch (error) {
                console.error("Failed to load landing page:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLandingData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <HeroSection movie={movies[0]} />

            <TrendingSection
                title="🔥 Trending Movies"
                movies={movies}
            />

            <TrendingSection
                title="📺 Trending TV Shows"
                movies={tvShows}
            />

            <FeaturesSection />

            <CTASection />

            <Footer />
        </div>
    );
}

export default Landing;