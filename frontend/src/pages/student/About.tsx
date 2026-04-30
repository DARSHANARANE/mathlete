import { motion } from "framer-motion";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

const About = () => {
  return (
    <>
    <Navbar />
    <section className="relative min-h-screen bg-bg text-primary overflow-hidden py-32">
      {/* 🌌 Soft Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* 🔥 HERO MESSAGE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          We Don’t Just Teach Math.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            We Build Confidence.
          </span>
        </motion.h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Mathlete helps students understand concepts, practice daily, and
          grow their problem-solving skills with clarity and structure.
        </p>

        {/* 🧮 PRODUCT PREVIEW */}
        <div className="mt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl w-[360px] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <p className="text-sm text-gray-400">Example Problem</p>
            <h3 className="text-lg font-semibold mt-2">
              Solve: 4x + 8 = 24
            </h3>

            <div className="mt-6 space-y-2 text-sm">
              <div className="bg-white/10 p-2 rounded">4x = 16</div>
              <div className="bg-white/10 p-2 rounded">x = 4</div>
            </div>

            <div className="mt-6 h-2 bg-gray-800 rounded-full">
              <div className="h-2 w-[75%] bg-indigo-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* 💎 CORE VALUES */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="font-semibold text-lg">Clarity First</h3>
            <p className="text-sm text-gray-400 mt-2">
              Concepts explained simply and clearly.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="font-semibold text-lg">Practice Driven</h3>
            <p className="text-sm text-gray-400 mt-2">
              Learn by solving real problems daily.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="font-semibold text-lg">Track Growth</h3>
            <p className="text-sm text-gray-400 mt-2">
              Monitor progress and improve consistently.
            </p>
          </div>

        </div>

        {/* 🚀 CTA */}
        <div className="mt-24">
          <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg shadow-lg transition">
            Start Learning
          </button>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;