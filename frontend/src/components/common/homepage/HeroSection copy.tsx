import { motion } from "framer-motion";
// import cloud from "../../../assets/cloud.png";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#dbeafe] overflow-hidden">

      {/* 🌈 Soft Blob Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* 🎯 MAIN BOX */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white shadow-2xl rounded-3xl p-8 w-[90%] max-w-xl text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Find Maths Question Papers 📘
        </h1>

        <p className="text-gray-500 mb-6">
          Select your class and download instantly
        </p>

        {/* 🎯 DROPDOWNS */}
        <div className="space-y-3">
          <select className="w-full p-3 rounded-xl border text-gray-700">
            <option>Select Class</option>
            {[...Array(10)].map((_, i) => (
              <option key={i}>Class {i + 1}</option>
            ))}
          </select>

          <select className="w-full p-3 rounded-xl border text-gray-700">
            <option>Select Year</option>
            <option>2024</option>
            <option>2023</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            🔍 Get Papers
          </button>
        </div>
      </motion.div>

      {/* ☁️ Subtle Bottom Cloud */}
      <div className="absolute bottom-0 w-full opacity-70">
        {/* <img src={cloud} alt="cloud" className="w-full" /> */}
      </div>
    </section>
  );
};

export default Hero;