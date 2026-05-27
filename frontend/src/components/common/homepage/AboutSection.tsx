import { motion } from "framer-motion";

const level1 = [
  { std: "Std 1", text: "Multiplication Tables 1 to 5" },
  { std: "Std 2", text: "Multiplication Tables 1 to 10" },
  { std: "Std 3", text: "Multiplication Tables 1 to 15" },
  { std: "Std 4", text: "Multiplication Tables 1 to 20" },
  { std: "Std 5", text: "Multiplication Tables 1 to 25" },
  {
    std: "Std 6",
    text: "Profit & Loss, Percentage, Simple Interest, Addition of Integers, Brain Gym",
  },
  {
    std: "Std 7",
    text: "Area, Perimeter, Diameter, Circumference, Pythagoras Theorem, Laws of Indices",
  },
];

const level2 = [
  {
    std: "Class 1",
    text: "Addition (without carryover), Subtraction (without borrowing)",
  },
  {
    std: "Class 2",
    text: "Addition (with carryover), Subtraction (with borrowing)",
  },
  {
    std: "Class 3",
    text: "Addition, Subtraction & Division based on tables 1–15",
  },
  {
    std: "Class 4",
    text: "Addition, Subtraction & Division based on tables 1–20",
  },
  {
    std: "Class 5",
    text: "Multiplication tables 1–25, Addition, Subtraction & Division",
  },
  {
    std: "Class 6",
    text: "Formula based word problems, Jumbled Exercise, IQ based Questions",
  },
  {
    std: "Class 7",
    text: "Formula based word problems, Jumbled Exercise, IQ based Questions",
  },
];

export default function SyllabusSection() {
  return (
    <section className="bg-white px-6 py-14 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
           
          <span className="text-[#e3344a] font-semibold uppercase tracking-wider">
            Mathlete Syllabus
          </span>

      
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-5 leading-tight">
            Portion for Level - 1 & Level - 2
          </h2>
          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            Explore the syllabus designed for each class level to strengthen
            mathematical skills through practice, problem solving, and fun learning.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Level 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-red-100 bg-red-50 p-7 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-[#e3344a] mb-6">
              Portion for Level - 1
            </h3>

            <div className="space-y-4">
              {level1.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-red-100 pb-3"
                >
                  <p className="font-semibold text-gray-800">
                    {item.std}
                  </p>

                  <p className="text-gray-600 text-sm leading-6 mt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Level 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-red-100 bg-white p-7 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-[#e3344a] mb-6">
              Portion for Level - 2
            </h3>

            <div className="space-y-4">
              {level2.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-3"
                >
                  <p className="font-semibold text-gray-800">
                    {item.std}
                  </p>

                  <p className="text-gray-600 text-sm leading-6 mt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}