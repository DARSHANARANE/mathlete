import { motion } from "framer-motion";
import Img_1 from "../../../assets/hero-4.png";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-bg text-text pt-24 pb-16">

      {/* 🔵 Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-accent/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-accent font-medium mb-2">
            🚀 Start Learning Today
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            The Best Platform to Enroll <br />
            in Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Special Course
            </span>
          </h1>

          <p className="mt-4 max-w-md opacity-80">
            Learn from expert teachers, practice daily, and grow your skills
            with interactive content.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-105 hover:shadow-lg transition">
              Get Started
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE (UPDATED DESIGN) */}
        <div className="relative flex justify-center items-center">

          {/* 🔥 Gradient Glow */}
          <div className="absolute w-[320px] h-[320px] bg-primary/20 blur-3xl rounded-full z-0"></div>

          {/* 🟡 Animated Blob 1 */}
          <div className="absolute w-[300px] h-[300px] bg-accent/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob z-0"></div>

          {/* 🟣 Animated Blob 2 */}
          <div className="absolute w-[260px] h-[260px] bg-primary/10 rounded-[30%_60%_70%_40%/50%_60%_30%_60%] animate-blob animation-delay-2000 z-0"></div>

          {/* Main Image */}
          <motion.img
            src={Img_1}
            alt="student"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-[75%] max-w-md object-contain"
          />

          {/* Small Shapes */}
          <div className="absolute top-10 left-0 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-0 w-3 h-3 bg-primary rounded-full animate-bounce"></div>

        </div>
      </div>
    </section>
  );
};

export default Hero;