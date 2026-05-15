import { motion } from "framer-motion";
import kidImg from "../../../assets/counter-h2-tp-img.webp";
import { Bubbles } from "lucide-react";
import Button from "../../ui/Button";

const floating = {
  animate: {
    y: [0, -18, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const stats = [
  {
    title: "Students",
    value: "4K+",
    color: "text-[#E3344A]",
    desc: "Young learners growing through practice.",
  },
  {
    title: "Years Legacy",
    value: "10+",
    color: "text-[#4A67FF]",
    desc: "A decade of trusted mathematics learning.",
  },
  {
    title: "Question Papers",
    value: "100+",
    color: "text-[#19B27B]",
    desc: "Practice sets designed for confidence building.",
  },
  {
    title: "School Network",
    value: "Growing",
    color: "text-[#F59E0B]",
    desc: "Partnering with schools for stronger learning.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f3eef8] px-6 py-28 md:px-16">
      {/* decorative shapes */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute right-0 top-24 h-[260px] w-[260px] rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative z-10 grid items-center gap-16 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E3344A]">
            About Mathlete
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#1b1444] md:text-5xl">
            Building Confidence
            <br />
            Through Practice
          </h2>

          <p className="mt-5 max-w-md text-base leading-8 text-[#6d6886]">
            Mathlete helps students strengthen concepts, sharpen speed,
            and enjoy mathematics through structured learning,
            exam-oriented practice, and confidence-building activities.
          </p>
          <Button className="mt-8">
            Learn More
          </Button>

          <motion.img
            src={kidImg}
            alt="kid"
            variants={floating}
            animate="animate"
            className="mt-14 w-[340px] drop-shadow-2xl"
          />
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8 }}
                className={`relative rounded-[28px] ${
                  index === 1 || index === 3 ? "mt-10" : ""
                }`}
              >
                {/* 3D depth */}
                <div className="absolute inset-0 translate-y-3 rounded-[28px] bg-[#d9d2ee]" />
                <div className="absolute inset-0 translate-y-1.5 rounded-[28px] bg-[#ebe6f8]" />

                {/* card */}
                <div className="relative rounded-[28px] bg-white p-6 shadow-[0_18px_35px_rgba(40,20,90,0.06)]">
                  <div className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-[#ffd7dd]" />

                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8b87a3]">
                    {item.title}
                  </h4>

                  <h2 className={`mt-3 text-5xl font-black ${item.color}`}>
                    {item.value}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#6d6886]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> 
    </section>
  );
}