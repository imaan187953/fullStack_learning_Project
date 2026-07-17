import { Search, Sparkles, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function HeroSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName =
    user?.displayName ||
    user?.username ||
    "Movie Lover";

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-red-950 p-10">

      <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-red-600/10 blur-3xl"></div>

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

        <div className="max-w-2xl">

          <p className="text-sm uppercase tracking-[0.35em] text-red-500">
            {greeting}
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white">
            {firstName} 👋
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Ready to discover your next favorite movie?
            Track films, organize watchlists, rate what you've watched,
            and receive AI-powered recommendations built just for you.
          </p>

        </div>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            <Search size={20} />
            Search Movies
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-white transition hover:border-red-500"
          >
            <Sparkles size={20} />
            AI Picks
          </button>

          <button
            onClick={() => navigate("/lists")}
            className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-white transition hover:border-red-500"
          >
            <List size={20} />
            My Lists
          </button>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;