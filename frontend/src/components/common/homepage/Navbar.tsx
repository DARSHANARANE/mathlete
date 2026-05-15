import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/mathlete_logo.png";
import Button from "../../ui/Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
const navLink = (path: string, label: string) => (
  <Link
    to={path}
    className="relative px-2 py-1 text-gray-700 hover:text-red-500 text-sm font-medium transition duration-300 group"
  >
    {label}
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-red-300 to-red-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="h-10 md:h-12 object-contain"
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

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold
       border border-red-300 text-red-400
hover:bg-red-400 hover:text-white
transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-800"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col gap-4 bg-white border-t border-red-100 text-gray-700">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/results" onClick={() => setOpen(false)}>Results</Link>
          <Link to="/papers" onClick={() => setOpen(false)}>Papers</Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>


<Button variant="primary" to="/papers">
  Download Now
</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;