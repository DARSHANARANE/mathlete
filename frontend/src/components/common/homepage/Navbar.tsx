import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../homepage/ThemeContext";
import Logo from "../../../assets/mathlete_logo.png";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext) as { dark: boolean; setDark: (dark: boolean) => void };

  return (
    <nav className=" w-full top-0 z-50 backdrop-blur-lg bg-bg/70 border-b border-white/10 shadow-sm">
      
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
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/about" className="hover:text-primary transition">About</Link>
          <Link to="/results" className="hover:text-primary transition">Results</Link>
          <Link to="/papers" className="hover:text-primary transition">Papers</Link>
          <Link to="/gallery" className="hover:text-primary transition">Gallery</Link>
          <Link to="/contact" className="hover:text-primary transition">Contact</Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-primary/10 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <Link
            to="/login"
            className="relative overflow-hidden bg-primary text-white dark:text-black px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-primary/10 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

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
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-4 bg-bg border-t border-gray-200 dark:border-gray-700">
          
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/papers" onClick={() => setOpen(false)}>Papers</Link>
          <Link to="/practice" onClick={() => setOpen(false)}>Practice</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>

          <Link
            to="/login"
            className="bg-primary text-white dark:text-black px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;