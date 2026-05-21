import heroBg from "../../../assets/img-3.jpg"; // your uploaded image
import UIButton from "../../ui/Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#120909]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Parents and Students"
          className="h-full w-full object-cover"
        />

        {/* Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b0000]/50 via-[#1a0000]/70 to-transparent" />
      </div>

  

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-20">
        <div className="max-w-2xl">
          {/* Small Tag */}
          <div className="mb-6 inline-flex items-center rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-200 backdrop-blur-sm">
            Trusted by Parents & Students
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black leading-tight text-white md:text-7xl"
          >
            Building Strong
            <br />
            <span className="text-red-500">
              Mathematical
            </span>{" "}
            Foundations
          </motion.h1>
              {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <UIButton className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl shadow-xl shadow-red-900/30">
             Explore Papers
            </UIButton>

            <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-md transition hover:bg-white/20">
              Explore Results
            </button>
          </motion.div>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-8 text-gray-300"
          >
            Helping students improve confidence, speed, and problem-solving
            skills through structured learning and guided practice.
          </motion.p>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-bold text-red-500">4k+</h3>
              <p className="mt-1 text-sm text-gray-300">
                Students Guided
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-red-500">10+</h3>
              <p className="mt-1 text-sm text-gray-300">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-red-500">95%</h3>
              <p className="mt-1 text-sm text-gray-300">
                Parent Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;