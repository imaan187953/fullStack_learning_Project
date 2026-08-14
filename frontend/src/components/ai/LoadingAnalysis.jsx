import {
  Brain,
  Database,
  Sparkles,
} from "lucide-react";

function LoadingAnalysis() {
  const steps = [
    {
      icon: Brain,
      title: "Analyzing your profile",
    },
    {
      icon: Database,
      title: "Searching semantic database",
    },
    {
      icon: Sparkles,
      title: "Generating AI recommendations",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          AI Analysis
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          CineTrack is building your personalized recommendations.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-zinc-800 bg-black p-4 sm:gap-4 sm:p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600/10 sm:h-10 sm:w-10">
                <Icon
                  className="animate-pulse text-red-500"
                  size={20}
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {step.title}
                </h3>

                <p className="mt-0.5 text-xs text-zinc-600 sm:text-sm">
                  Please wait...
                </p>
              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
}

export default LoadingAnalysis;