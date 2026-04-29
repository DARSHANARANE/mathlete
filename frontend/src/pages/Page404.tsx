import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#020617] text-white overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="text-center px-6 z-10">

        {/* 🔢 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-300"
        >
          This page does not exist...
        </motion.p>

        {/* Math Twist */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-indigo-400 text-xl font-medium"
        >
          404 ≠ Page Found
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          {/* Go Home */}
          <Link to="/home">
            <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition shadow-lg">
              Go Home
            </button>
          </Link>

          {/* Go Back */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg transition"
          >
            Go Back
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default NotFound;