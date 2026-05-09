import { motion } from "framer-motion";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

const About = () => {
  const values = [
    {
      title: "Clarity First",
      text: "Concepts explained simply so every student can understand with confidence.",
      color: "bg-[#ffe6ea]",
    },
    {
      title: "Practice Driven",
      text: "Learning happens through solving real questions step by step.",
      color: "bg-[#e9f0ff]",
    },
    {
      title: "Track Growth",
      text: "Measure progress, build confidence, and improve consistently.",
      color: "bg-[#eaf8ef]",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-white py-20">
        {/* decorative shapes */}
        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-pink-100" />
        <div className="absolute right-10 top-20 h-24 w-24 rounded-full bg-blue-100" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* left content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E3344A]">
                Our Purpose
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-[#1b1444] md:text-5xl">
                We Don’t Just Teach Math.
                <br />
                We Build Confidence.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#6d6886]">
                Mathlete helps children build confidence in mathematics
                through fun, structured practice. Mathematics is one of the
                most important subjects for developing logical thinking, yet
                many children often find it challenging.
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#6d6886]">
                At Mathlete, we believe strong mathematical skills are built
                through regular practice—not shortcuts. Our competitive exam
                and specially designed workbook help children strengthen
                concepts, improve speed and accuracy, and enjoy learning
                mathematics in an engaging way.
              </p>
            </div>

            {/* right example card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-[34px] bg-[#f8f5ff] p-8 shadow-[0_20px_45px_rgba(40,20,90,0.06)]"
            >
              <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[#ffd7dd]" />

              <p className="text-sm font-semibold text-[#8b87a3]">
                Example Problem
              </p>

              <h3 className="mt-3 text-2xl font-black text-[#1b1444]">
                Solve: 4x + 8 = 24
              </h3>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#1b1444] shadow-sm">
                  4x = 16
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#1b1444] shadow-sm">
                  x = 4
                </div>
              </div>

              <div className="mt-8 h-3 rounded-full bg-white">
                <div className="h-3 w-[75%] rounded-full bg-[#E3344A]" />
              </div>
            </motion.div>
          </div>

          {/* vision + mission */}
          <div className="mt-24 grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] bg-[#fff8ef] p-8 shadow-[0_14px_30px_rgba(40,20,90,0.05)]">
              <h3 className="text-2xl font-bold text-[#1b1444]">Vision</h3>
              <p className="mt-4 text-sm leading-8 text-[#5f5a7a]">
                To make mathematics accessible, enjoyable, and
                confidence-building for every child, helping them grow into
                logical and independent thinkers.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#eefbf4] p-8 shadow-[0_14px_30px_rgba(40,20,90,0.05)]">
              <h3 className="text-2xl font-bold text-[#1b1444]">Mission</h3>
              <p className="mt-4 text-sm leading-8 text-[#5f5a7a]">
                To strengthen mathematical foundations through structured
                practice, engaging learning methods, and competitive exam
                preparation that makes learning both effective and enjoyable.
              </p>
            </div>
          </div>

          {/* core values */}
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[28px] p-7 shadow-[0_14px_30px_rgba(40,20,90,0.05)] ${item.color}`}
              >
                <h3 className="text-xl font-bold text-[#1b1444]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#5f5a7a]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;