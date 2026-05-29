import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Sparkles,
  Trophy,
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
            MATHLETE COMPETITION SCHEDULE
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
            Competition & Result Schedule
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-gray-600 text-sm sm:text-[15px] md:text-base leading-7 px-2">
            Winners and Merit Holders of Level 1 qualify for Level 2.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-6">

          {/* Schedule Card */}
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
            <div className="flex gap-4 items-center">
            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.08,
              }}
              className="w-14 h-14 rounded-2xl bg-[#ffe5ea] flex items-center justify-center mb-5"
            >
              <Sparkles className="text-[#E3344A]" size={26} />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              Mathlete Competition Schedule
            </h3>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-sm sm:text-base">
                <thead className="bg-[#E3344A] text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">
                      Level
                    </th>

                    <th className="py-3 px-4 text-left">
                      Competition
                    </th>

                    <th className="py-3 px-4 text-left">
                      Results
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 font-semibold">
                      Level - I
                    </td>

                    <td className="py-3 px-4">
                      October
                    </td>

                    <td className="py-3 px-4">
                      December
                    </td>
                  </tr>

                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-4 font-semibold">
                      Level - II
                    </td>

                    <td className="py-3 px-4">
                      February
                    </td>

                    <td className="py-3 px-4">
                      June
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 bg-[#fff5f5] border border-pink-100 rounded-xl p-4">
              <p className="text-gray-700 text-sm sm:text-[15px] leading-7">
                Winners and Merit Holders of Level 1 qualify for
                Level 2.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}