import Navbar from "../../components/common/homepage/Navbar";
import HeroSection from "../../components/common/homepage/HeroSection";
import Footer from "../../components/common/homepage/Footer";
import AboutSection from "../../components/common/homepage/AboutSection";
import StudentCertificationSlider from "../../components/common/StudentCertificationSlider";
import IntroSection from "../../components/common/homepage/IntroSection";
import Features from "../../components/common/homepage/Features";

const Home = () => {
  return (
     <>
     <Navbar />
    <div className="min-h-screen bg-bg text-text">
      <HeroSection/>
      <AboutSection />
      <IntroSection />
      <StudentCertificationSlider />
        <Features />
    </div>
    <Footer />
    </>
    
  );
};

export default Home;



