import kidImg from "../../../assets/hero-5.png";
import UIButton from "../../ui/Button";
import { motion } from "framer-motion";
const stats = [
  { title: "Papers", value: "+100", cta: "Explore" },
  { title: "Students", value: "+2k", cta: "Join Now" },
  { title: "Solved", value: "+200k", cta: "Start" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f3eef8] pt-16 pb-20">
      {/* background waves */}
      <div className="absolute right-0 top-0 h-full w-[38%] opacity-30">
        <div className="h-full w-full bg-[repeating-linear-gradient(180deg,transparent_0px,transparent_18px,rgba(90,76,140,0.08)_19px,transparent_38px)]" />
      </div>

      {/* abstract shapes */}
      <motion.div
      animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
       className="absolute z-15 right-[20%] top-14 h-28 w-28 rounded-full bg-blue-200" />
   
     
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-orange-400" />
      <div className="absolute  z-30 right-0 bottom-0 h-44 w-44 rounded-tl-[120px] bg-yellow-400" />
     <div className="absolute z-30 right-[22%] bottom-0 h-36 w-36 rounded-tr-[120px] bg-[#E3344A]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <h1 className="max-w-xl text-5xl font-black leading-tight text-[#1b1444] md:text-6xl">
            Unique education system
            <br />
            that pushes you to success
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#6d6886] md:text-base">
            Practice smarter with previous papers, timed tests, and guided
            learning designed to improve speed, confidence, and real exam
            performance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <UIButton >Join</UIButton>

            <button className="flex items-center gap-3 text-sm font-medium text-[#2c255d]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-white">
                ▶
              </span>
              Watch Introduction
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 rounded-3xl bg-white p-5 shadow-[0_15px_35px_rgba(40,20,90,0.08)]">
            {stats.map((item) => (
              <div key={item.title} className="text-center">
                <p className="text-xs font-semibold text-[#8b87a3]">
                  {item.title}
                </p>
                <h3 className="mt-1 text-4xl font-black  text-[#E3344A]">
                  {item.value}
                </h3>

                <button className="mt-3 rounded-full bg-[#E3344A] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#d92d42] transition">
                  {item.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
       <div className="relative flex justify-center md:justify-end">
      <motion.div
        transition={{ repeat: Infinity, duration: 5 }}
        className="relative h-[520px] w-[360px]"
      >
        {/* shapes above image */}
      
         <motion.div
      animate={{ y: [0, -80, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      className="absolute z-20 -left-8 top-8 h-28 w-28 rounded-full bg-emerald-500" />

        {/* dotted decoration */}
        <div className="absolute z-30 -left-12 top-1/2 grid -translate-y-1/2 grid-cols-4 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2c255d]/40" />
          ))}
        </div>

        {/* image */}
        <div className="absolute inset-0 z-10 overflow-hidden rounded-t-[160px] rounded-b-[40px] bg-white">
          <img
            src={kidImg}
            alt="Student"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
      </div>
    </section>
  );
};

export default Hero;