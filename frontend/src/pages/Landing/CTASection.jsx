import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-red-500/20 bg-linear-to-r from-red-600 via-red-700 to-red-900 px-10 py-20 text-center shadow-2xl shadow-red-900/30"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Ready to Build Your Movie Library?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-red-100">
            Join CineTrack today and start tracking your favorite movies and TV
            shows, creating watchlists, writing reviews, and receiving AI-powered
            recommendations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-red-700 transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-red-700"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;