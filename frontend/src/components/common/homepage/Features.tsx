import { motion } from "framer-motion";

const steps = [
  {
    title: "Student Registration ",
    desc: "Register yourself and begin your journey with mathlete.",
    buttonText: "Register",
    link: "https://forms.eduqfix.com/edufitform/add",
  },
  {
    title: "Practice Books",
    desc: "Learn concepts through carefully designed books and enhance mathematical problem solving skills.",
    buttonText: "Buy Book",
    link: "/books",
  },
  {
    title: "Purchase Practice Papers",
    desc: "Boost preparation with practice tests.",
    buttonText: "Buy Papers",
    link: "/papers",
  },
  {
    title: "Level -1 Exam ",
    desc: "Appear for level -1 exam win exciting prizes and qualify for level -2 exam.",
  },
  {
    title: "Level -2 Exam",
    desc: "Compete with all- rounders and test your level among the best  student",
  },
];

const positions = [
  "md:mt-0",
  "md:mt-16",
  "md:mt-6",
  "md:mt-20",
  "md:mt-10",
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden py-28">
      {/* floating decorations */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute left-10 top-16 text-4xl"
      >
        📘
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute right-14 top-20 text-4xl"
      >
        ✏️
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
        className="absolute left-1/3 top-24 text-3xl text-[#E3344A]"
      >
        +
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
        className="absolute right-1/4 bottom-16 text-3xl text-[#4A67FF]"
      >
        ×
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#1b1444] md:text-5xl">
            How{" "}
            <span className="relative inline-block ">
              Mathlete Works
              <span className="absolute -bottom-2 left-0 -z-10 h-3 w-full rounded-full bg-[#ffd7dd]" />
            </span>
          </h2>

          <p className="mt-4 text-[#6d6886]">
            Simple steps to begin your Mathlete journey
          </p>
        </div>

        {/* curved path */}
        <div className="relative mt-24">
          <svg
            className="absolute left-0 top-10 hidden w-full md:block"
            viewBox="0 0 1200 220"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M20 110 
                 C180 0, 320 220, 500 110 
                 C680 0, 820 220, 1000 110
                 C1080 60, 1140 160, 1180 110"
              stroke="#e5d9c7"
              strokeWidth="4"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`relative ${positions[i]}`}
              >
                {/* number bubble */}
                <div className="relative z-20 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E3344A] text-lg font-bold text-white shadow-lg">
                  {i + 1}
                </div>

                {/* card */}
                <div className="relative mt-6 rounded-[28px] bg-white p-6 text-center shadow-[0_18px_35px_rgba(40,20,90,0.06)]">
                  {/* decoration */}
                  <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-[#ffe6b7]" />

                  <h3 className="text-lg font-bold text-[#1b1444]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6d6886]">
                    {step.desc}
                  </p>
                  {step.buttonText && (
  <a
    href={step.link}
    className="mt-5 inline-flex items-center rounded-full bg-[#E3344A] px-4 py-2 text-xs font-semibold text-white transition hover:scale-105 hover:bg-[#c92c40]"
  >
    {step.buttonText}
  </a>
)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;