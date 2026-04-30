import { motion } from "framer-motion";
import kidImg from "../../../assets/hero-7.png";
import CloudWave from "./CloudWave";

const mathItems = ["x²", "π", "√16", "7+5", "a+b", "10÷2"];

const Hero = () => {
  return (
    <section className="relative bg-primary pt-32 pb-32 text-white overflow-visible">

      {/* 📐 Subtle Math Background Pattern */}
      <div className="absolute inset-0 opacity-10 text-white text-3xl flex flex-wrap gap-10 p-10 pointer-events-none">
        {mathItems.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>

      {/* 🌌 Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-400 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-400 opacity-20 blur-[120px] rounded-full"></div>

      {/* ✨ Floating Symbols */}
      {mathItems.map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4 + i }}
          className="absolute text-yellow-300 text-lg font-semibold opacity-80"
          style={{
            top: `${20 + i * 60}px`,
            left: `${i * 100}px`,
          }}
        >
          {item}
        </motion.div>
      ))}

      {/* 🌍 Floating Circle */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute right-20 top-40 w-20 h-20 bg-teal-300 rounded-full opacity-60 blur-sm"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-20">

        {/* LEFT */}
        <div className="space-y-6">
          <span className="inline-block bg-sky-300 text-[#2f3e6f] px-5 py-2 rounded-full text-sm font-semibold">
            Welcome to Mathlete
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Smart <span className="text-pink-300">Maths Practice</span><br />
            for Students
          </h1>

          <p className="text-lg text-gray-200 max-w-lg">
            Practice question papers, improve problem-solving skills, and download previous year papers in one place.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-accent text-[#2f3e6f] font-semibold rounded-full shadow-lg hover:scale-105 transition">
              Start Practice
            </button>

            <button className="px-8 py-3 border border-white/30 rounded-full hover:bg-white/10 transition">
              Download Papers
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div className="absolute w-[380px] h-[380px] bg-white/10 blur-3xl rounded-full"></div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="relative w-[340px] h-[340px]"
          >
            <div className="absolute inset-0 rounded-[60%_40%_50%_50%/40%_50%_60%_50%] overflow-hidden shadow-2xl border border-white/20">
              <img
                src={kidImg}
                alt="Student Learning"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🌊 CLOUD WAVE (fixed position) */}
      <CloudWave />

    </section>
  );
};

export default Hero;