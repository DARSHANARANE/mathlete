import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Brain,
  Calculator,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
};

const floating: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12">

      {/* Background Blur */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-0 left-0 w-52 h-52 bg-pink-200 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 w-52 h-52 bg-blue-100 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.span
            variants={floating}
            animate="animate"
            className="text-[#e3344a] font-semibold uppercase tracking-wider"
          >
            BUILDING YOUNG MATH CHAMPIONS
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
            Transforming Fear Of Math <br />
            Into{" "}
            <span className="text-[#E3344A]">
              Confidence & Success
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 text-sm sm:text-[15px] md:text-base leading-7 px-2">
            Mathlete makes mathematics simple, engaging, and enjoyable
            through smart learning techniques, exciting challenges,
            and activity-based practice methods.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

          {/* Introduction Card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -5,
            }}
            className="bg-white rounded-[24px] p-5 sm:p-6 shadow-lg border border-pink-100"
          >
            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.08,
              }}
              className="w-14 h-14 rounded-2xl bg-[#ffe5ea] flex items-center justify-center mb-5"
            >
              <Brain className="text-[#E3344A]" size={26} />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 leading-snug">
              Empowering Students <br />
              Through Smart Learning
            </h3>

            <p className="text-gray-600 leading-7 text-sm sm:text-[15px]">
              Mathlete focuses on strengthening mathematical concepts
              through continuous practice and interactive learning.
              Students improve speed, logical thinking, confidence,
              and problem-solving abilities in a fun way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="bg-[#fff5f5] rounded-xl p-4 text-center"
              >
                <h4 className="text-2xl sm:text-3xl font-bold text-[#E3344A]">
                  900+
                </h4>

                <p className="text-gray-600 mt-1 text-sm">
                  Practice Examples
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="bg-[#f4f8ff] rounded-xl p-4 text-center"
              >
                <h4 className="text-2xl sm:text-3xl font-bold text-blue-600">
                  500+
                </h4>

                <p className="text-gray-600 mt-1 text-sm">
                  Advanced Problems
                </p>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Side Cards */}
          <div className="space-y-5">

            {/* Level 1 */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="bg-white rounded-[24px] p-5 sm:p-6 shadow-lg border border-pink-100 hover:border-[#E3344A] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">

                <motion.div
                  whileHover={{
                    rotate: -10,
                    scale: 1.08,
                  }}
                  className="min-w-[55px] h-[55px] rounded-2xl bg-[#ffe5ea] flex items-center justify-center"
                >
                  <Calculator
                    className="text-[#E3344A]"
                    size={24}
                  />
                </motion.div>

                <div>
                  <span className="inline-block text-[11px] sm:text-xs font-semibold bg-[#E3344A] text-white px-3 py-1 rounded-full mb-3">
                    LEVEL 1
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Foundation & Speed Building
                  </h3>

                  <p className="text-gray-600 leading-7 text-sm sm:text-[15px]">
                    Students strengthen tables, calculations,
                    concentration, and speed through smart exercises
                    and continuous mathematical practice.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Level 2 */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="bg-white rounded-[24px] p-5 sm:p-6 shadow-lg border border-blue-100 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4">

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.08,
                  }}
                  className="min-w-[55px] h-[55px] rounded-2xl bg-blue-100 flex items-center justify-center"
                >
                  <Trophy
                    className="text-blue-600"
                    size={24}
                  />
                </motion.div>

                <div>
                  <span className="inline-block text-[11px] sm:text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full mb-3">
                    LEVEL 2
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Advanced Logical Thinking
                  </h3>

                  <p className="text-gray-600 leading-7 text-sm sm:text-[15px]">
                    Students improve accuracy, logical reasoning,
                    multiplication, division, and advanced
                    mathematical problem-solving skills.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}