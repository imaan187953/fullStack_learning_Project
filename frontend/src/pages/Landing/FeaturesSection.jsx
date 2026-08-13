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
    <section className="bg-zinc-950 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 md:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Why Choose CineTrack?
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-gray-400 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            Everything you need to discover, organize, rate, review, and receive
            intelligent recommendations for movies and TV shows.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/20 sm:rounded-2xl sm:p-6 lg:p-8"
              >
                <div className="mb-4 inline-flex rounded-lg bg-red-600 p-3 sm:mb-5 sm:rounded-xl sm:p-4">
                  <Icon
                    size={24}
                    className="text-white sm:h-7 sm:w-7"
                  />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white sm:mb-3 sm:text-xl lg:mb-4 lg:text-2xl">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
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
