import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Ghost,
  Sparkles,
} from "lucide-react";

const floatingAnimation = {
  animate: {
    y: [0, -18, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const stars = Array.from({ length: 25 });

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] px-6 text-white">

      {/* Animated Stars */}
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#E3344A] opacity-20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-pink-500 opacity-20 blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl text-center">

        {/* Floating Ghost */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-white/10 p-8 backdrop-blur-md">
            <Ghost
              size={90}
              className="text-[#ff8fa3]"
            />
          </div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
          className="bg-gradient-to-r from-[#ff8fa3] via-[#E3344A] to-[#ffb3c1] bg-clip-text text-[120px] font-black leading-none text-transparent md:text-[200px]"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-4xl font-black md:text-6xl"
        >
          Page Lost In Space
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-300"
        >
          The page you are trying to visit has vanished into
          another dimension. Let’s get you back safely.
        </motion.p>

        {/* Math Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#ffffff20] bg-white/10 px-6 py-3 text-sm font-semibold text-[#ffb3c1] backdrop-blur-md"
        >
          <Sparkles size={16} />
          404 ≠ Page Found
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          {/* Home */}
          <Link to="/home">
            <button className="group flex items-center gap-2 rounded-full bg-[#E3344A] px-8 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(227,52,74,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:bg-[#cc2339]">
              <Home
                size={18}
                className="transition group-hover:scale-110"
              />
              Back Home
            </button>
          </Link>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:text-[#0f172a]"
          >
            <ArrowLeft
              size={18}
              className="transition group-hover:-translate-x-1"
            />
            Go Back
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;