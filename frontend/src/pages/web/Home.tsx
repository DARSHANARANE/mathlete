import Navbar from "../../components/common/homepage/Navbar";
import HeroSection from "../../components/common/homepage/HeroSection";


const Home = () => {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <HeroSection/>

      {/* Test Section */}
      <div className="p-6">
        <h1 className="text-primary text-3xl font-bold">
          Theme Working Test
        </h1>

        <button className="mt-4 bg-primary text-white dark:text-black px-4 py-2 rounded">
          Button Test
        </button>
      </div>
    </div>
  );
};

export default Home;



