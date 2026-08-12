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
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        AI Analysis
      </h2>

      <div className="space-y-5">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <div className="rounded-full bg-red-600/20 p-3">

                <Icon
                  className="animate-pulse text-red-500"
                  size={22}
                />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-500">
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