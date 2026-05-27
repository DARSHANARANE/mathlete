import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/mathlete_logo.png";
import Button from "../../ui/Button";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
const navLink = (path: string, label: string) => {
  const isExternal = path.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-2 py-1 text-gray-700 hover:text-red-500 text-sm font-medium transition duration-300 group"
      >
        {label}
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-red-300 to-red-500 transition-all duration-300 group-hover:w-full"></span>
      </a>
    );
  }

  return (
    <Link
      to={path}
      className="relative px-2 py-1 text-gray-700 hover:text-red-500 text-sm font-medium transition duration-300 group"
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-red-300 to-red-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
        {/* Logo */}
         <button
            onClick={() => setOpen(true)}
            className="md:hidden text-3xl text-gray-800 relative top-[-2px]"
          >
            ☰
          </button>
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="logo"
            className="h-10 md:h-12 object-contain"
          />
        </Link>

        </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("https://forms.eduqfix.com/edufitform/add", "Student Registration")}
          {navLink("/books", "Purchase Books")}
          {navLink("/papers", "Purchase  Papers")}
          {navLink("/gallery", "Gallery")}
          {navLink("/results", "Results")}  
          {navLink("/contact", "Contact")}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="secondary" to="/papers">
            Download Papers
          </Button>
        </div>
      </div>
      <div>
{/* Mobile Toggle */}

{/* Mobile Drawer */}
<div
  className={`fixed inset-y-0 left-0 w-[280px] z-50
  bg-white backdrop-blur-xl
  border-r border-white/30
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  `}
>
  {/* Drawer Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
    <img src={Logo} alt="logo" className="h-10" />

    <button
      onClick={() => setOpen(false)}
      className="text-2xl text-gray-800 relative top-[-2px]"
    >
      ✕
    </button>
  </div>

  {/* Drawer Links */}
  <div className="flex flex-col gap-5 px-6 py-8 text-gray-800 font-medium
    bg-white backdrop-blur-xl
  border-r border-white/30
  shadow-2xl  h-screen">
    <Link to="/" onClick={() => setOpen(false)}>
      Home
    </Link>

    <Link to="/about" onClick={() => setOpen(false)}>
      About
    </Link>


    <Link to="/exam-fees" onClick={() => setOpen(false)}>
      Student Registration
    </Link>
    <Link to="/books" onClick={() => setOpen(false)}>
      Purchase Books
    </Link>
       <Link to="/papers" onClick={() => setOpen(false)}>
      Purchase Papers
    </Link>



    <Link to="/gallery" onClick={() => setOpen(false)}>
      Gallery
    </Link>
    <Link to="/results" onClick={() => setOpen(false)}>
      Results
    </Link>
    <Link to="/contact" onClick={() => setOpen(false)}>
      Contact
    </Link>

    <div className="pt-4">
      <Button variant="secondary" to="/papers">
        Download Papers
      </Button>
    </div>
  </div>
</div>
      </div>
    </nav>
  );
};

export default Navbar;