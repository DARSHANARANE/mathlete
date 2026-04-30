import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/mathlete_logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLink = (path: string, label: string) => (
    <Link to={path} className="relative group">
      <span className="transition duration-300 group-hover:text-yellow-300">
        {label}
      </span>

      {/* Underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-lg bg-[#2f3e6f]/90 ">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/results", "Results")}
          {navLink("/papers", "Papers")}
          {navLink("/gallery", "Gallery")}
          {navLink("/contact", "Contact")}
        </div>

        {/* CTA Button (Important Upgrade) */}
        <div className="hidden md:block">
          <Link
            to="/papers"
            className="px-5 py-2 bg-yellow-300 text-[#2f3e6f] rounded-full font-semibold hover:scale-105 transition"
          >
            Download Papers
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col gap-4 bg-[#2f3e6f] text-white border-t border-white/10">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/results" onClick={() => setOpen(false)}>Results</Link>
          <Link to="/papers" onClick={() => setOpen(false)}>Papers</Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {/* Mobile CTA */}
          <Link
            to="/papers"
            className="mt-2 px-4 py-2 bg-yellow-300 text-[#2f3e6f] rounded-full text-center font-semibold"
          >
            Download Papers
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;