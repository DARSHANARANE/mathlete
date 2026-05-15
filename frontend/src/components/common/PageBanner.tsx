import React from "react";
import { motion } from "framer-motion";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  icon,
}) => {
  return (
    <section className="relative h-[250px] overflow-hidden bg-[#eaf6ff]">
      {/* soft layered hills */}
      <div className="absolute bottom-0 left-0 h-28 w-full rounded-t-[120px] bg-[#dff2ff]" />
      <div className="absolute bottom-0 left-0 h-20 w-full rounded-t-[100px] bg-[#cfeaff]" />

      {/* floating default book */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute left-12 top-10 text-5xl"
      >
        📘
      </motion.div>

      {/* floating default pencil */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
        className="absolute right-16 top-8 text-5xl"
      >
        ✏️
      </motion.div>

      {/* math symbols */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute left-1/3 top-14 text-3xl font-bold text-[#E3344A]"
      >
        +
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.2 }}
        className="absolute right-1/3 top-16 text-3xl font-bold text-[#4A67FF]"
      >
        ×
      </motion.div>

      {/* center content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div>
          {icon && <div className="mb-3 text-4xl">{icon}</div>}

          <h1 className="text-4xl font-black text-[#1b1444] md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-sm text-[#6d6886] md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;