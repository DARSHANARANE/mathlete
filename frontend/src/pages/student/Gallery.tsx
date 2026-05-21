import { motion } from "framer-motion";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

/* auto import all gallery images */
const galleryImages = Object.values(
  import.meta.glob("../../assets/gallery/**/*", {
    eager: true,
  })
)
  .filter((module: any) => {
    const path = module.default || "";

    return (
      path.endsWith(".jpg") ||
      path.endsWith(".jpeg") ||
      path.endsWith(".png") ||
      path.endsWith(".webp") ||
      path.endsWith(".JPG") ||
      path.endsWith(".JPEG") ||
      path.endsWith(".PNG") ||
      path.endsWith(".WEBP")
    );
  })
  .map((module: any, index) => {
    const layouts = [
      "md:col-span-2 md:row-span-2 h-[420px]",
      "h-[200px]",
      "h-[260px]",
      "md:row-span-2 h-[420px]",
      "h-[240px]",
      "md:col-span-2 h-[260px]",
    ];

    return {
      id: index + 1,
      src: module.default,
      layout: layouts[index % layouts.length],
    };
  });
console.log(galleryImages);
const Gallery = () => {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-[#fffdf8] py-12">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink-100 blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-100 blur-3xl opacity-40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-14 text-center">
            <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-500">
              Our Memories
            </span>

            <h2 className="mt-4 text-4xl font-black text-[#1b1444] md:text-5xl">
              Gallery Collage
            </h2>

            <p className="mt-3 text-[#6d6886]">
              Beautiful moments from our learning journey
            </p>
          </div>

          <div className="columns-1 gap-5 space-y-5 sm:columns-2 md:columns-3 lg:columns-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ y: -6 }}
               className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)]"
              >
                <img
                  src={img.src}
                  alt="gallery"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 translate-y-10 p-5 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-bold">
                    Mathlete Moments
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    Learning • Activities • Success
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;