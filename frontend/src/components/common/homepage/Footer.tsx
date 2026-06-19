import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0f172a] text-white">

      {/* Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E3344A] via-[#ff7b8f] to-[#E3344A]" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr]">

          {/* Left Section */}
          <div>

            <Link
              to="/"
              className="inline-block"
            >
              <h2 className="text-4xl font-black tracking-wide">
                MATHLETE
              </h2>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Empowering students with creative, modern,
              and interactive educational experiences.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">

              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    text-gray-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#E3344A]
                    hover:bg-[#E3344A]
                    hover:text-white
                  "
                >
                  <Icon size={16} />
                </a>
              ))}

            </div>
          </div>

          {/* Links */}
          <div>

            <h3 className="text-xl font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {[
                { name: "About", path: "/about" },
                { name: "Results", path: "/results" },
                { name: "Products", path: "/products" },
                { name: "Students Registration", path: "/students" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="
                    text-sm
                    text-gray-400
                    transition-all
                    hover:translate-x-1
                    hover:text-white
                  "
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-bold text-white">
              Contact Info
            </h3>

            <div className="mt-6 space-y-5">

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

                <p className="text-xs uppercase tracking-widest text-[#E3344A]">
                  Email
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  
                  edufit2022@gmail.com
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

                <p className="text-xs uppercase tracking-widest text-[#E3344A]">
                  Phone
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  98230 30379, 96650 06698
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

                <p className="text-xs uppercase tracking-widest text-[#E3344A]">
                  Address
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  Kothrud , Pune
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-3 md:flex-row items-center justify-between">

          <p className="text-sm text-gray-400">
            © 2026 MATHLETE. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Developed by{" "}
            <span className="font-semibold text-white">
              Team MiniAn
            </span>
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;