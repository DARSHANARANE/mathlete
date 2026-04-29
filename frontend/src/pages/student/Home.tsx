import Navbar from "../../components/common/homepage/Navbar";
import HeroSection from "../../components/common/homepage/HeroSection";
import About from "../../components/common/homepage/About";
import Features from "../../components/common/homepage/Features";
import Footer from "../../components/common/homepage/Footer";

const Home = () => {
  return (
     <>
     <Navbar />
    <div className="min-h-screen bg-bg text-text">
      <HeroSection/>
      <About />
      <Features />
    </div>
    <Footer />
    </>
    
  );
};

export default Home;



