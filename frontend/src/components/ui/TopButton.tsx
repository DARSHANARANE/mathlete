import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4 }}
          onClick={scrollTop}
          className="
            fixed
            right-5
            bottom-5
            z-50
            h-[120px]
            w-[55px]
            rounded-full
            bg-[#E3344A]
            text-white
            shadow-xl
            flex
            flex-col
            items-center
            justify-center
            gap-2
            hover:scale-105
            transition-all
            duration-300
          "
        >
          <ArrowUp size={24} strokeWidth={3} />

          <span
            className="
              rotate-[-90deg]
              text-sm
              font-bold
              tracking-wider
              whitespace-nowrap
            "
          >
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}