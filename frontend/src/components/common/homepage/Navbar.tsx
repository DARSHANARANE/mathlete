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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
        <div className="hidden md:flex items-center gap-8">
          {navLink("/", "Home")}
          {navLink("/about", "About")}
          {navLink("/results", "Results")}

          {/* Products Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium  text-gray-700 hover:text-red-500 transition-colors">
              Products
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className="
        absolute left-0 top-full mt-3
        w-48 rounded-xl border border-slate-200
        bg-white shadow-xl
        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-all duration-300
        overflow-hidden
      "
            >
              <Link
                to="/papers"
                className="block px-4 py-3 text-sm text-slate-700 hover:bg-[#FFF1F3] hover:text-[#E3344A] transition-colors"
              >
                Buy Papers
              </Link>

              <Link
                to="/books"
                className="block px-4 py-3 text-sm text-slate-700 hover:bg-[#FFF1F3] hover:text-[#E3344A] transition-colors"
              >
                Buy Books
              </Link>
            </div>
          </div>
          {navLink("https://forms.eduqfix.com/edufitform/add", "Student Registration")}
          {navLink("/gallery", "Gallery")}
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

    <Link to="/results" onClick={() => setOpen(false)}>
      Results
    </Link>

    {/* Products Dropdown */}
    <div>
      <button
        onClick={() => setProductOpen(!productOpen)}
        className="flex items-center gap-2"
      >
        Products

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            productOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {productOpen && (
        <div className="mt-3 ml-4 flex flex-col gap-3 border-l border-white/30 pl-4">
          <Link
            to="/papers"
            onClick={() => {
              setOpen(false);
              setProductOpen(false);
            }}
          >
            Buy Papers
          </Link>

          <Link
            to="/books"
            onClick={() => {
              setOpen(false);
              setProductOpen(false);
            }}
          >
            Buy Books
          </Link>
        </div>
      )}
    </div>

    <Link to="/exam-fees" onClick={() => setOpen(false)}>
      Exam Fees
    </Link>

    <Link to="/gallery" onClick={() => setOpen(false)}>
      Gallery
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