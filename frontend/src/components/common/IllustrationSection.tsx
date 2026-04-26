import React from "react";
import { motion } from "framer-motion";

const IllustrationSection: React.FC = () => {
  return (
    <section className="relative w-full h-[200px] md:h-[200px] overflow-hidden">

      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94')",
        }}
      />

      {/* 🌫 Overlay (for readability) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ✨ Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-blue-400 rounded-full opacity-70"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-purple-400 rounded-full opacity-70"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
    </section>
  );
};

export default IllustrationSection;