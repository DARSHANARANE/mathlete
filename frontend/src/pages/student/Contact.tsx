import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock3,
  Sparkles,
  ArrowRight,
  MessageCircleMore,
} from "lucide-react";

import Navbar from "../../components/common/homepage/Navbar";
import Footer from "../../components/common/homepage/Footer";
import { CREATE_CONTACT } from "../../graphql/mutations";
import TopButton from "../../components/ui/TopButton";

type CreateContactResponse = {
  createContact: {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
  };
};

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [createContact, { loading }] =
    useMutation<CreateContactResponse>(CREATE_CONTACT);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createContact({
        variables: {
          ...formData,
        },
      });

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const contactCards = [
    {
      icon: <Mail className="text-[#E3344A]" size={24} />,
      title: "Email Address",
      value: "support@mathlete.com",
      bg: "bg-[#fff1f2]",
    },
    {
      icon: <Phone className="text-[#ff9800]" size={24} />,
      title: "Phone Number",
      value: "98230 30379, 96650 06698 ",
      bg: "bg-[#fff7e8]",
    },
    {
      icon: <MapPin className="text-[#2b7fff]" size={24} />,
      title: "Office Location",
      value: " Kothrud , Pune ",
      bg: "bg-[#eef6ff]",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff5f5] via-white to-[#fff7f8] py-12">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f110_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f110_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow Effects */}
        <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#ffccd5] blur-3xl opacity-50" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-[#ffe4d6] blur-3xl opacity-50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">

          {/* Hero Section */}
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left Content */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffd9df] bg-white px-5 py-2 text-sm font-semibold text-[#E3344A] shadow-sm">
                <Sparkles size={16} />
                Let’s Connect
              </div>

              <h1 className="max-w-xl text-5xl font-black leading-tight text-[#111827] md:text-7xl">
                We’d Love To Hear From You
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6b7280]">
                Have questions, feedback, or partnership ideas?
                Our team is always ready to help you and support
                your journey.
              </p>

            </div>

            {/* Right Side Form */}
            <div className="relative">

              <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#ffe4e6] blur-3xl" />

              <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-[#ffd7c2] blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/50 bg-white/80 p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.08)]">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#E3344A]">
                      Contact Support
                    </p>

                    <h2 className="mt-2 text-4xl font-black text-[#111827]">
                      Send Message
                    </h2>
                  </div>

                  <div className="rounded-3xl bg-[#fff1f2] p-4">
                    <MessageCircleMore
                      className="text-[#E3344A]"
                      size={28}
                    />
                  </div>

                </div>

                {/* Form */}
                <form
                  className="mt-10 space-y-6"
                  onSubmit={handleSubmit}
                >

                  {/* Name + Email */}
                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Your Name"
                        className="
                          h-16
                          w-full
                          rounded-3xl
                          border
                          border-[#ece8f6]
                          bg-white
                          px-5
                          text-sm
                          text-[#111827]
                          outline-none
                          transition-all
                          focus:border-[#E3344A]
                          focus:ring-4
                          focus:ring-[#E3344A]/10
                        "
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="Your Email"
                        className="
                          h-16
                          w-full
                          rounded-3xl
                          border
                          border-[#ece8f6]
                          bg-white
                          px-5
                          text-sm
                          text-[#111827]
                          outline-none
                          transition-all
                          focus:border-[#E3344A]
                          focus:ring-4
                          focus:ring-[#E3344A]/10
                        "
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Subject"
                      className="
                        h-16
                        w-full
                        rounded-3xl
                        border
                        border-[#ece8f6]
                        bg-white
                        px-5
                        text-sm
                        text-[#111827]
                        outline-none
                        transition-all
                        focus:border-[#E3344A]
                        focus:ring-4
                        focus:ring-[#E3344A]/10
                      "
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write Your Message..."
                      className="
                        w-full
                        rounded-3xl
                        border
                        border-[#ece8f6]
                        bg-white
                        px-5
                        py-5
                        text-sm
                        text-[#111827]
                        outline-none
                        transition-all
                        focus:border-[#E3344A]
                        focus:ring-4
                        focus:ring-[#E3344A]/10
                      "
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      group
                      relative
                      flex
                      h-16
                      w-full
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-full
                      bg-[#E3344A]
                      text-sm
                      font-semibold
                      text-white
                      shadow-xl
                      shadow-[#E3344A]/30
                      transition-all
                      hover:-translate-y-1
                      hover:bg-[#cc2339]
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    "
                  >

                    <span className="absolute left-[-100%] top-0 h-full w-full skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]" />

                    <Send size={18} />

                    {loading ? "Sending..." : "Send Message"}

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </button>

                </form>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {contactCards.map((item, index) => (
              <div
                key={index}
                className="
                flex
                gap-5
                  group
                  rounded-[32px]
                  border
                  border-[#f3e8ea]
                  bg-white
                  p-7
                  shadow-lg
                  shadow-[#00000008]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-[#E3344A]/20
                  hover:shadow-[0_20px_50px_rgba(227,52,74,0.15)]
                "
              >

                <div
                  className={`mb-5 flex h-16 w-16 items-center justify-center rounded-3xl ${item.bg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                    {item.value}
                  </p>
                </div>


              </div>
            ))}

          </div>


          {/* Map */}
          <div className="mt-24 overflow-hidden rounded-[40px] border border-white/40 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] hidden">

            <iframe
              title="map"
              src="https://maps.google.com/maps?q=thane&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[450px] w-full border-0"
              loading="lazy"
            />

          </div>

        </div>
      </section>

      <Footer />
      <TopButton />
    </>
  );
};

export default Contact;