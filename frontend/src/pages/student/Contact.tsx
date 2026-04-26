import { Mail, Phone, MapPin } from "lucide-react";
import  Navbar from "../../components/common/homepage/Navbar";
const Contact = () => {
  return (
    <>
     <Navbar />
    <div className="bg-gray-50 min-h-screen py-10 px-4"> 
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-500 mt-2">
            Get in touch with EV Dock for support, queries, or partnerships
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <Mail className="mx-auto mb-3 text-blue-500" size={28} />
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-gray-500">evdockin@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <Phone className="mx-auto mb-3 text-green-500" size={28} />
            <h3 className="font-semibold text-lg">Phone</h3>
            <p className="text-gray-500">+91 9903910391</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <MapPin className="mx-auto mb-3 text-red-500" size={28} />
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="text-gray-500">India</p>
          </div>
        </div>

        {/* FORM + MAP */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* CONTACT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                placeholder="Your Message"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
    </> 
    
  );
};

export default Contact;