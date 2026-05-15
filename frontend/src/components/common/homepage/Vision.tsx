export default function Vision() {
  const cards = [
    {
      title: "Mission",
      text: "Nurturing logical thinking and academic excellence through structured practice.",
    },
    {
      title: "Programs",
      text: "School mathematics programs, assessments, and competitive exam preparation.",
    },
    {
      title: "Why Mathlete",
      text: "Concept clarity, speed, accuracy, and confidence-building through guided learning.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f3eef8] py-8">
      {/* decorative shapes */}
      <div className="absolute left-12 top-16 h-20 w-20 rounded-full bg-pink-200" />
      <div className="absolute right-16 top-20 h-28 w-28 rounded-full bg-blue-200" />
      <div className="absolute bottom-20 left-1/3 h-16 w-16 rounded-full bg-emerald-300" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* main feature card */}
          <div className="relative overflow-hidden rounded-[36px] bg-white p-10 shadow-[0_25px_45px_rgba(40,20,90,0.08)]">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#ffd7dd]" />
            <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-[40px] bg-[#e9f0ff]" />

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E3344A]">
              Vision
            </p>

            <h2 className="mt-4 max-w-lg text-4xl font-black leading-tight text-[#1b1444] md:text-5xl">
              Building confident learners through mathematics
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#6d6886]">
              Making mathematics accessible, enjoyable, and
              confidence-building for every student through structured
              learning, practice, and guided academic growth.
            </p>

            <button className="mt-8 rounded-full bg-[#E3344A] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Learn More
            </button>
          </div>

          {/* side cards */}
          <div className="space-y-6">
            {cards.map((item, index) => (
              <div
                key={item.title}
                className={`relative rounded-[28px] bg-white p-6 shadow-[0_18px_35px_rgba(40,20,90,0.06)] `}
              >
                <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-[#ffd7dd]" />

                <h3 className="text-lg font-bold text-[#1b1444]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6d6886]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}