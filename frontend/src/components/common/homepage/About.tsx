const categories = [
  { title: "Class 6", papers: "120+ Papers" },
  { title: "Class 7", papers: "140+ Papers" },
  { title: "Class 8", papers: "160+ Papers" },
  { title: "Class 9", papers: "180+ Papers" },
  { title: "Class 10", papers: "220+ Papers" },
  { title: "Class 12", papers: "250+ Papers" },
];

const Categories = () => {
  return (
    <section className="bg-secondary/20 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            Browse by Class
          </h2>
          <p className="text-gray-500 mt-2">
            Select your class and start practicing
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-semibold text-primary">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.papers}
              </p>

              <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90">
                View Papers
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Categories;