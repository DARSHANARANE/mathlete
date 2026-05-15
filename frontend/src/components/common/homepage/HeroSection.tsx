import kidImg from "../../../assets/hero-5.png";
import UIButton from "../../ui/Button";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f3eef8] pt-2 pb-8">
      {/* decorative shapes */}

      <div className="absolute  z-20 right-0 top-0 h-28 w-28 rounded-bl-[80px] bg-orange-300 to bg-orange-500" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        {/* LEFT */}
        <div className="pt-10">

          <h1 className="max-w-xl text-[52px] font-black leading-[1.02] tracking-[-0.03em] text-[#1b1444] md:text-[68px]">
            Build
            <br />
            <span className="relative inline-block">
              Confidence
              <span className="absolute bottom-2 left-0 -z-10 h-5 w-full rounded-full bg-[#ffe0e4]" />
            </span> in Math
            Through{" "}
            <span className="relative inline-block text-[#E3344A]">
              Practice
              <span className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-[#ffd7dd] -z-10" />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#6d6886] md:text-base">
            Mathlete helps children strengthen tables, sharpen speed, and
            master elementary mathematics through fun, structured practice.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <UIButton>Download Papers</UIButton>

            <button className="flex items-center gap-3 text-sm font-medium text-[#2c255d]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-white">
                ▶
              </span>
              Watch Introduction
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center md:justify-end">
          <motion.div
            transition={{ repeat: Infinity, duration: 5 }}
            className="relative h-[520px] w-[500px]"
          >
            {/* shapes above image */}

            <motion.div
              animate={{ y: [0, -80, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute z-20 -left-8 top-8 h-28 w-28 rounded-full bg-emerald-400 to bg-emerald-500" />

            {/* dotted decoration */}
            <div className="absolute z-30 -left-12 top-1/2 grid -translate-y-1/2 grid-cols-4 gap-2">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#2c255d]/40" />
              ))}
            </div>

            {/* image */}
            <div className="absolute inset-0 z-10 overflow-hidden  bg-white">
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