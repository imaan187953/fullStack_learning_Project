import { Film, Star, Sparkles } from "lucide-react";

function AuthSidePanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-3xl lg:flex lg:w-1/2">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80"
        alt="Cinema"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/70 to-red-900/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10">

        <div>
          <div className="mb-8 flex items-center gap-3">
            <Film className="h-9 w-9 text-red-500" />

            <h1 className="text-3xl font-bold text-white">
              CineTrack
            </h1>
          </div>

          <h2 className="mb-6 text-5xl font-extrabold leading-tight text-white">
            Track Every
            <span className="block text-red-500">
              Story
            </span>
          </h2>

          <p className="max-w-md text-lg leading-8 text-gray-300">
            Organize your favorite movies and TV shows,
            rate them, write reviews,
            create custom lists,
            and discover new content through AI recommendations.
          </p>
        </div>

        {/* Bottom Cards */}

        <div className="space-y-4">

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <Star className="text-yellow-400" />

            <div>
              <h3 className="font-semibold text-white">
                Rate Everything
              </h3>

              <p className="text-sm text-gray-300">
                Build your personal movie profile.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <Sparkles className="text-red-400" />

            <div>
              <h3 className="font-semibold text-white">
                AI Recommendations
              </h3>

              <p className="text-sm text-gray-300">
                Personalized suggestions powered by your taste.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AuthSidePanel;