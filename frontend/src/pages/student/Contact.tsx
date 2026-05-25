import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { Mail, Phone, MapPin } from "lucide-react";

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

      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden bg-[#fffdf9] py-24">
        {/* decorative shapes */}
        <div className="absolute left-10 top-12 h-20 w-20 rounded-full bg-pink-100" />
        <div className="absolute right-10 top-20 h-24 w-24 rounded-full bg-orange-100" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            {/* left info */}
            <div className="rounded-[34px] bg-[#fff2e8] p-8 shadow-[0_20px_40px_rgba(40,20,90,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E3344A]">
                Get in Touch
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-[#1b1444]">
                Let’s Talk
              </h2>

              <p className="mt-5 max-w-md text-sm leading-8 text-[#6d6886]">
                Have questions, feedback, or want to connect with us?
                Send us a message and our team will get back to you.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Mail size={18} className="text-[#E3344A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1b1444]">Email</p>
                    <p className="text-sm text-[#6d6886]">
                      your@email.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Phone size={18} className="text-[#E3344A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1b1444]">Phone</p>
                    <p className="text-sm text-[#6d6886]">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <MapPin size={18} className="text-[#E3344A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1b1444]">Location</p>
                    <p className="text-sm text-[#6d6886]">
                      Thane, Maharashtra
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* right form */}
            <div className="rounded-[34px] bg-white p-8 shadow-[0_20px_45px_rgba(40,20,90,0.06)]">
              <h2 className="text-3xl font-black text-[#1b1444]">
                Send Message
              </h2>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#ece8f6] px-5 py-4 text-sm outline-none transition focus:border-[#E3344A]"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#ece8f6] px-5 py-4 text-sm outline-none transition focus:border-[#E3344A]"
                />

                <input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ece8f6] px-5 py-4 text-sm outline-none transition focus:border-[#E3344A]"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#ece8f6] px-5 py-4 text-sm outline-none transition focus:border-[#E3344A]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#E3344A] py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Back To Top Button */}
      <TopButton />
    </>
  );
};

export default Contact;