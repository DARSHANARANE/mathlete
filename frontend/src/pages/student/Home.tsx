import Navbar from "../../components/common/homepage/Navbar";
import HeroSection from "../../components/common/homepage/HeroSection";
import Footer from "../../components/common/homepage/Footer";
import AboutSection from "../../components/common/homepage/AboutSection";
import StudentCertificationSlider from "../../components/common/StudentCertificationSlider";
import IntroSection from "../../components/common/homepage/IntroSection";
import Features from "../../components/common/homepage/Features";
import TopButton from "../../components/ui/TopButton";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg text-text overflow-hidden">
        <HeroSection />

        <AboutSection />

        <IntroSection />

        <StudentCertificationSlider />

        <Features />
      </main>

      <Footer />

      {/* Back To Top Button */}
      <TopButton />
    </>
  );
};

export default Home;