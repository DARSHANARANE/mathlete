import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/mathlete_logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Reusable Link Style
  const navLink = (path: string, label: string) => (
    <Link to={path} className="relative group">
      <span className="transition-colors duration-300 hover:text-primary">
        {label}
      </span>

      {/* Underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-lg bg-white border-b border-gray-200 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-text">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/results", "Results")}
          {navLink("/papers", "Papers")}
          {navLink("/gallery", "Gallery")}
          {navLink("/contact", "Contact")}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-2xl text-text"
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
        <div className="px-4 pb-4 flex flex-col gap-4 bg-bg text-text border-t border-gray-200">

          <Link to="/" onClick={() => setOpen(false)} className="hover:text-primary">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="hover:text-primary">About</Link>
          <Link to="/results" onClick={() => setOpen(false)} className="hover:text-primary">Results</Link>
          <Link to="/papers" onClick={() => setOpen(false)} className="hover:text-primary">Papers</Link>
          <Link to="/gallery" onClick={() => setOpen(false)} className="hover:text-primary">Gallery</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-primary">Contact</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;