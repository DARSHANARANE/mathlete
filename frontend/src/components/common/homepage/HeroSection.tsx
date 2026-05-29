import heroBg from "../../../assets/main_bg.jpeg";
import UIButton from "../../ui/Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Parents and Students"
          className="h-full w-full object-cover brightness-90 contrast-110"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Smooth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-20">
        {/* Glass Content Box */}
        <div className="max-w-2xl rounded-3xl bg-white/55 p-8 backdrop-blur-md shadow-2xl border border-white/30">
          
          {/* Small Tag */}
          <div className="mb-6 inline-flex items-center rounded-full border border-red-200 bg-white/80 px-5 py-2 text-sm font-bold text-red-600 shadow-sm">
            Trusted by Parents & Students
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black leading-tight text-black md:text-7xl"
          >
            Learn Through
            <br />
            <span className="text-red-600">
              Competition
            </span>
          </motion.h1>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <UIButton
              to="/papers"
              className="rounded-xl bg-red-600 px-8 py-4 text-white shadow-lg transition hover:bg-red-700"
            >
              Practice Paper
            </UIButton>

            <UIButton
              to="/books"
              variant="secondary"
              className="rounded-xl border border-black/10 bg-white/90 px-8 py-4 font-semibold text-black transition"
            >
              Book Purchase
            </UIButton>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg font-medium leading-8 text-gray-800"
          >
            We are delighted to introduce MATHLETE, a competitive exam purely
            based on elementary mathematics. Mathematics is the most logical
            but ironically the most dreaded subject, to which there is no
            shortcut but practice.
          </motion.p>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-black text-red-600">10k+</h3>
              <p className="mt-1 text-sm font-semibold text-gray-700">
                Students
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-red-600">10+</h3>
              <p className="mt-1 text-sm font-semibold text-gray-700">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-red-600">100+</h3>
              <p className="mt-1 text-sm font-semibold text-gray-700">
                Schools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;