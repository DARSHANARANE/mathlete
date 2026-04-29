import { Mail, Phone, MapPin} from "lucide-react";
import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";

const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Left Side - Info */}
        <div className="bg-primary text-white p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6 text-white/80">
              Have questions or want to work with us? Fill the form and we’ll get back to you soon.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>your@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Thane, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-primary transition">
              <Mail size={18} />
            </a>
            <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-primary transition">
              <Phone size={18} />
            </a>
            <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-primary transition">
              <MapPin size={18} />
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

          <form className="space-y-5">
            
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;