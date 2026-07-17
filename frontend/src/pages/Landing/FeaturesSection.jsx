import { Film, Star, MessageSquareText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Film,
    title: "Track Your Library",
    description:
      "Organize every movie and TV show you've watched or plan to watch using custom lists.",
  },
  {
    icon: Star,
    title: "Rate Instantly",
    description:
      "Give ratings from 1 to 10 and build a personal movie profile based on your taste.",
  },
  {
    icon: MessageSquareText,
    title: "Write Reviews",
    description:
      "Share your opinions, edit reviews anytime, and discover what others think.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description:
      "Receive personalized recommendations powered by your ratings, reviews, and watchlists.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white">
            Why Choose CineTrack?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            Everything you need to discover, organize, rate, review, and receive
            intelligent recommendations for movies and TV shows.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/20"
              >
                <div className="mb-6 inline-flex rounded-xl bg-red-600 p-4">
                  <Icon size={30} className="text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;