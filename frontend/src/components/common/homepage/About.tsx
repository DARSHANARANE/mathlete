import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-40 bg-[#020617] text-white overflow-hidden">

      {/* 🌌 Radial Spotlight Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),transparent_60%)]"></div>

      {/* 🌫️ Soft Glow Layers */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-0 w-[500px] h-[500px] bg-indigo-400/10 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* 🧠 HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
        >
          A New Way to{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
            Experience Maths
          </span>
        </motion.h2>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg">
          Designed for focus, built for mastery — Mathlete transforms learning
          into a structured, interactive experience.
        </p>

        {/* 🎯 FLOATING UI STACK */}
        <div className="relative mt-28 flex justify-center items-center">

          {/* 🔲 Main Glass Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 w-[360px] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <h3 className="text-lg font-semibold text-white">
              Algebra Session
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              Solve: 3x - 6 = 12
            </p>

            {/* Progress */}
            <div className="mt-5 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"></div>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              70% Completed
            </p>
          </motion.div>

          {/* 🔳 Layer Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-10 -left-20 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-xl text-sm text-gray-300"
          >
            📊 Accuracy 96%
          </motion.div>

          {/* 🔳 Layer Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-20 -right-20 bg-indigo-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm"
          >
            🧠 Smart Practice
          </motion.div>

          {/* 🔳 Layer Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-12 left-10 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-xl text-sm text-gray-400"
          >
            ⏱ Daily Streak: 12 days
          </motion.div>

        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 px-10 py-4 bg-indigo-500 hover:bg-indigo-600 transition rounded-xl text-lg shadow-[0_10px_40px_rgba(99,102,241,0.5)]"
        >
          Start Your Journey
        </motion.button>

      </div>
    </section>
  );
};

export default About;