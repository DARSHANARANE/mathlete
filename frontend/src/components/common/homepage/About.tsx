import { motion } from "framer-motion";
import kidImg from "../../../assets/counter-h2-tp-img.webp";

const floating = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const stats = [
  {
    title: "Students Graduated",
    value: "750K",
    color: "text-green-500",
  },
  {
    title: "Academic Programs",
    value: "289+",
    color: "text-blue-400",
  },
  {
    title: "Global Awards",
    value: "85+",
    color: "text-orange-400",
  },
  {
    title: "Schools Worldwide",
    value: "65+",
    color: "text-pink-400",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 px-6 md:px-16 overflow-hidden 
      bg-gradient-to-r from-[#c9d6ff] via-[#d7c7ff] to-[#e6b8ff]">

      {/* soft glow */}
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-purple-300 blur-3xl opacity-20 rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 relative z-10">
          <p className="text-pink-500 uppercase tracking-widest text-sm font-semibold">
            Our Results
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            We’re Proud Of Our <br /> Clients & Projects
          </h2>

          <p className="text-gray-600 max-w-md">
            We’ve helped thousands of students grow through innovative and
            engaging learning experiences.
          </p>

          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 transition">
            Read More →
          </button>

          {/* FLOATING IMAGE */}
          <motion.img
            src={kidImg}
            alt="kid"
            variants={floating}
            animate="animate"
            className="w-[340px] mt-16 drop-shadow-2xl"
          />
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="relative">

          {/* Grid with offsets */}
          <div className="grid grid-cols-2 gap-6">

            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-xl"
            >
              <h4 className="font-semibold mb-2">Students Graduated</h4>
              <h2 className="text-5xl font-bold text-green-500">750K</h2>
              <p className="text-sm text-gray-500 mt-2">
                Donec sit amet turpis tincidunt eros.
              </p>
            </motion.div>

            {/* Card 2 (top offset) */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-xl mt-10"
            >
              <h4 className="font-semibold mb-2">Academic Programs</h4>
              <h2 className="text-5xl font-bold text-blue-400">289+</h2>
              <p className="text-sm text-gray-500 mt-2">
                Donec sit amet turpis tincidunt eros.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-xl"
            >
              <h4 className="font-semibold mb-2">Global Awards</h4>
              <h2 className="text-5xl font-bold text-orange-400">85+</h2>
              <p className="text-sm text-gray-500 mt-2">
                Donec sit amet turpis tincidunt eros.
              </p>
            </motion.div>

            {/* Card 4 (bottom offset) */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-2xl shadow-xl mt-10"
            >
              <h4 className="font-semibold mb-2">Schools Worldwide</h4>
              <h2 className="text-5xl font-bold text-pink-400">65+</h2>
              <p className="text-sm text-gray-500 mt-2">
                Donec sit amet turpis tincidunt eros.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* pencil */}
      <div className="absolute bottom-6 right-6 text-3xl">✏️</div>
    </section>
  );
}