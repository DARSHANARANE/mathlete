import { motion } from "framer-motion";
import cloud from "../../../assets/cloud-1.jpg";

const CloudWave = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden">
      <motion.img
        src={cloud}
        alt="Cloud Wave"
        className="w-[130%] max-w-none opacity-25 -ml-[15%]"
        animate={{
          x: [0, 60, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default CloudWave;