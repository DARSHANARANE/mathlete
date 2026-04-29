import { useState } from "react";
import { motion } from "framer-motion";
import Img1 from "../../assets/img-1.jpg";
import Img2 from "../../assets/img-2.jpg";
import Img3 from "../../assets/img-3.jpg";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

const images = [
  { id: 1, src: Img1, category: "Events" },
  { id: 2, src: Img2, category: "Campus" },
  { id: 3, src: Img3, category: "Events" },
//   { id: 4, src: Img4, category: "Students" },
//   { id: 5, src: Img5, category: "Campus" },
//   { id: 6, src: "/images/img6.jpg", category: "Students" },
];

const categories = ["All", "Events", "Campus", "Students"];

const Gallery = () => {
  const [active, setActive] = useState("All");

  const filteredImages =
    active === "All"
      ? images
      : images.filter((img) => img.category === active);

  return (
    <>
    <Navbar />
    <section className="min-h-screen bg-white text-text py-16 px-6">
      
      {/* 🔥 Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          Our Gallery
        </h2>
        <p className="text-gray-400 mt-2">
          Explore moments from our journey
        </p>
      </div>

      {/* 🎯 Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full border transition ${
              active === cat
                ? "bg-indigo-500 border-indigo-500"
                : "border-gray-600 hover:border-indigo-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🖼️ Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
        {filteredImages.map((img) => (
            <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-xl group cursor-pointer bg-gray-100 flex items-center justify-center"
            >
            {/* ✅ FIXED IMAGE */}
            <img
                src={img.src}
                alt="gallery"
                className="w-full h-64 object-contain p-2"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-lg font-semibold text-indigo-400">
                {img.category}
                </p>
            </div>
            </motion.div>
        ))}
        </motion.div> 
    </section>
    <Footer />
    </>
  );
};

export default Gallery;