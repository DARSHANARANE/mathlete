import { motion } from "framer-motion";
import kidImg from "../../../assets/hero-4.png";
import cloud from "../../../assets/clould-5.png";

const mathItems = ["x²", "π", "√16", "7+5"];

const Hero = () => {
  return (
<section className="relative bg-gradient-to-br from-[#162447] via-[#2d5bff] to-[#7aa8ff] pt-28 pb-40 text-white overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(120,170,255,0.22),transparent_40%)]" />


      {/* 🔢 Minimal Floating Symbols */}
      {mathItems.map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -60, 0] }}
          transition={{ repeat: Infinity, duration: 4 + i }}
          className="absolute text-yellow-300 text-xl font-bold opacity-70"
          style={{
            top: `${100 + i * 80}px`,
            left: `${80 + i * 120}px`,
          }}
        >
          {item}
        </motion.div>
      ))}

      {/* 🌟 Glow Background */}
      <div className="absolute right-10 top-20 w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="inline-block bg-white/20 backdrop-blur px-5 py-2 rounded-full text-sm">
            🚀 Welcome to Mathlete
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Smart <span className="text-pink-300">Math Practice</span><br />
            Made Fun & Easy
          </h1>

          <p className="text-lg text-white/80 max-w-lg">
            Solve papers, improve speed, and boost confidence with interactive learning.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-white text-[#2f3e6f] font-semibold rounded-full shadow-lg hover:scale-105 transition">
              Download Papers
            </button>

            <button className="px-8 py-3 border border-white/30 rounded-full hover:bg-white/10 transition">
              View Results
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="relative w-[320px] h-[320px]"
          >
            <div className="absolute inset-0 rounded-[60%_40%_50%_50%/40%_50%_60%_50%] overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md">
              <img
                src={kidImg}
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ☁️ CLOUD BOTTOM (FIXED & ATTACHED) */}
<div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
  <img
    src={cloud}
    alt="cloud"
    className="w-full h-full object-cover"
  />
</div>
    </section>
  );
};

export default Hero;