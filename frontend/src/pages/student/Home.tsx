import Navbar from "../../components/common/homepage/Navbar";
import HeroSection from "../../components/common/homepage/HeroSection";
import Features from "../../components/common/homepage/Features";
import Footer from "../../components/common/homepage/Footer";
import Vision from "../../components/common/homepage/Vision";
import AboutSection from "../../components/common/homepage/AboutSection";

const Home = () => {
  return (
     <>
     <Navbar />
    <div className="min-h-screen bg-bg text-text">
      <HeroSection/>
      <Vision />
      <AboutSection />
      <Features />
    </div>
    <Footer />
    </>
    
  );
};

export default Home;



