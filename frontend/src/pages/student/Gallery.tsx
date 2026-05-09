import { motion } from "framer-motion";
import Img1 from "../../assets/img-1.jpg";
import Img2 from "../../assets/img-2.jpg";
import Img3 from "../../assets/img-3.jpg";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

const images = [
  {
    id: 1,
    src: Img1,
    title: "Mathlete Moments",
    desc: "Students learning through fun and practice.",
    span: "md:col-span-2 md:row-span-2",
    height: "h-[420px]",
    rotate: "-rotate-1",
  },
  {
    id: 2,
    src: Img2,
    title: "School Activities",
    desc: "Exploring mathematics together.",
    span: "",
    height: "h-[200px]",
    rotate: "rotate-1",
  },
  {
    id: 3,
    src: Img3,
    title: "Classroom Joy",
    desc: "Confidence grows with every step.",
    span: "",
    height: "h-[200px]",
    rotate: "-rotate-2",
  },
];

const Gallery = () => {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden bg-[#fffdf8] py-20">
        {/* decorative shapes */}
        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-pink-100" />
        <div className="absolute right-12 top-20 h-24 w-24 rounded-full bg-blue-100" />
        <div className="absolute bottom-12 left-1/3 h-16 w-16 rounded-full bg-yellow-100" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* heading */}
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-black text-[#1b1444] md:text-5xl">
              Our Gallery
            </h2>

            <p className="mt-3 text-[#6d6886]">
              Explore moments from our learning journey
            </p>
          </div>

          {/* collage */}
          <div className="grid auto-rows-[200px] gap-6 md:grid-cols-3">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, rotate: 0 }}
                className={`group relative overflow-hidden rounded-[30px] bg-white p-3 shadow-[0_18px_35px_rgba(40,20,90,0.06)] ${img.span} ${img.rotate}`}
              >
                <div className={`overflow-hidden rounded-[24px] ${img.height}`}>
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* overlay content */}
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/90 p-4 backdrop-blur-md">
                  <h3 className="font-bold text-[#1b1444]">{img.title}</h3>
                  <p className="mt-1 text-sm text-[#6d6886]">{img.desc}</p>
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