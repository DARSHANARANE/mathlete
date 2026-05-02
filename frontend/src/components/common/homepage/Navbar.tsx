import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/mathlete_logo.png";
import cloud from "../../../assets/clould-7.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLink = (path: string, label: string) => (
    <Link
      to={path}
      className="relative px-2 py-1 text-white/90 hover:text-white transition duration-300 group"
    >
      {label}

      {/* Glow underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-100 shadow-[0_0_10px_rgba(253,224,71,0.8)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="w-full sticky top-0 z-50 relative">
      {/* Glass Container */}
   <div
  className="relative mx-auto px-6 py-3
  backdrop-blur-2xl 
  shadow-[0_10px_35px_rgba(0,0,0,0.25)]
  flex justify-between items-center overflow-hidden z-10"
  style={{
    backgroundImage: `linear-gradient(135deg, rgba(22,36,71,0.85), rgba(45,91,255,0.75), rgba(122,168,255,0.7)), url(${cloud})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
        {/* subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.15),transparent_40%)] pointer-events-none" />

        {/* Logo */}
<Link
  to="/"
  className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
>
  {/* brush stroke */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-y-1 left-0 right-0 rounded-[40%] blur-sm opacity-70"
      style={{
        background:
          "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.35), transparent 22%), radial-gradient(circle at 40% 40%, rgba(255,255,255,0.22), transparent 20%), radial-gradient(circle at 65% 55%, rgba(255,255,255,0.28), transparent 24%), linear-gradient(90deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08))",
      }}
    />
  </div>

  <img
    src={Logo}
    alt="logo"
    className="relative z-10 h-10 md:h-12 object-contain"
  />
</Link>

        {/* Desktop Menu */}
        <div className="relative z-10 hidden md:flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/results", "Results")}
          {navLink("/papers", "Papers")}
          {navLink("/gallery", "Gallery")}
          {navLink("/contact", "Contact")}
        </div>

        {/* CTA */}
        <div className="relative z-10 hidden md:block">
          <Link
            to="/papers"
            className="px-5 py-2 rounded-full font-semibold
            bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100
            text-[#162447]
            shadow-[0_6px_20px_rgba(253,224,71,0.45)]
            hover:scale-105 hover:-translate-y-[1px]
            transition duration-300"
          >
            Download Papers
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="relative z-10 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-2xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          open
            ? "max-h-96 opacity-100 mt-2"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div
          className="mx-4 p-4 rounded-3xl backdrop-blur-2xl bg-white/10
          border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.25)]
          flex flex-col gap-4 text-white"
        >
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/results" onClick={() => setOpen(false)}>Results</Link>
          <Link to="/papers" onClick={() => setOpen(false)}>Papers</Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <Link
            to="/papers"
            className="mt-2 px-4 py-2 rounded-full text-center font-semibold
            bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100
            text-[#162447]"
          >
            Download Papers
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;