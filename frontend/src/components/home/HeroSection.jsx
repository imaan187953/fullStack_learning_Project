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
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-red-950 p-5 sm:rounded-3xl sm:p-7 md:p-8 lg:p-10">

      {/* Decorative glow */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-600/10 blur-3xl sm:h-52 sm:w-52 lg:h-60 lg:w-60" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">

        {/* Content */}
        <div className="max-w-2xl">

          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-red-500 sm:text-xs sm:tracking-[0.3em] md:text-sm md:tracking-[0.35em]">
            {greeting}
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:mt-3 sm:text-4xl md:text-5xl">
            {firstName} 👋
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:mt-4 sm:text-base sm:leading-7 md:mt-6 md:text-lg md:leading-8">
            Ready to discover your next favorite movie?
            Track films, organize watchlists, rate what you've watched,
            and receive AI-powered recommendations built just for you.
          </p>

        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:flex lg:w-52 lg:flex-col lg:gap-3">

          <button
            onClick={() => navigate("/search")}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-3 lg:px-5 lg:py-3"
          >
            <Search size={17} />
            Search
          </button>

          <button
            onClick={() => navigate("/ai")}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white transition hover:border-red-500 sm:px-3 lg:px-5 lg:py-3"
          >
            <Sparkles size={17} />
            AI Picks
          </button>

          <button
            onClick={() => navigate("/lists")}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white transition hover:border-red-500 sm:px-3 lg:px-5 lg:py-3"
          >
            <List size={17} />
            My Lists
          </button>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;
