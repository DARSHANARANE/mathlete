import { motion } from "framer-motion";

const steps = [
  {
    title: "Choose Topic",
    desc: "Start with Algebra, Geometry, or any concept you want to master.",
  },
  {
    title: "Learn Concepts",
    desc: "Understand formulas with simple explanations and examples.",
  },
  {
    title: "Practice Problems",
    desc: "Solve real questions and improve step by step.",
  },
  {
    title: "Track Progress",
    desc: "Monitor your performance and grow consistently.",
  }, 
];

const HowItWorks = () => {
  return (
    <section className="py-28 bg-white dark:bg-light text-text">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            How{" "}
            <span className="text-indigo-500">Mathlete Works</span>
          </h2>

          <p className="mt-3 opacity-70">
            A simple path to mastering mathematics
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 relative">

          {/* Line (desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-800"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-primary text-white rounded-full z-10 relative shadow-lg">
                {i + 1}
              </div>

              {/* Card */}
              <div className="mt-6 bg-[#0b1220] text-text border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl transitionmt-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm opacity-70 mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;