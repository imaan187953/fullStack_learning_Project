import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="bg-black py-10 sm:py-14 lg:py-24">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-5 md:px-6">

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-red-500/20 bg-linear-to-r from-red-600 via-red-700 to-red-900 px-4 py-10 text-center shadow-2xl shadow-red-900/30 sm:rounded-3xl sm:px-8 sm:py-14 lg:px-10 lg:py-20"
        >
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-5xl">
            Ready to Build Your Movie Library?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-red-100 sm:mt-5 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg">
            Join CineTrack today and start tracking your favorite movies and TV
            shows, creating watchlists, writing reviews, and receiving AI-powered
            recommendations.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-10 lg:gap-5">
            <Link
              to="/register"
              className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:scale-105 sm:w-auto sm:rounded-xl sm:px-7 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              Create Free Account
            </Link>

            <Link
              to="/login"
              className="w-full rounded-lg border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-red-700 sm:w-auto sm:rounded-xl sm:px-7 sm:py-3.5 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
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
