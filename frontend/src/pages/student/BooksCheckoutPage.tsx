import { BookOpen, Lock, MapPin, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../components/common/homepage/Navbar";

export default function BooksCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const book = location.state?.book;

  const [studentName, setStudentName] =
    useState("");

  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [pincode, setPincode] = useState("");

  if (!book) {
    return (
      <div className="p-10 text-center">
        No book selected
      </div>
    );
  }

  const subtotal = Number(book.price || 0);

  const tax = Number(
    (subtotal * 0.18).toFixed(2)
  );

  const total = Number(
    (subtotal + tax).toFixed(2)
  );

  const handlePayment = async () => {
    try {
      if (
        !studentName ||
        !mobile ||
        !email ||
        !address ||
        !pincode
      ) {
        alert("Please fill all fields");
        return;
      }

      const orderRes = await fetch(
        "http://localhost:5000/api/upload/book-payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            bookId: book.id,
            amount: total,
          }),
        }
      );

      const orderData =
        await orderRes.json();

      const options = {
        key: orderData.key,

        amount: orderData.amount,

        order_id: orderData.orderId,

        name: "Mathlete",

        description: "Book Purchase",

        handler: async function (
          response: any
        ) {
          const verifyRes = await fetch(
            "http://localhost:5000/api/upload/book-payment/verify",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                bookId: book.id,

                studentName,

                mobile,

                email,

                address,

                pincode,

                amount: total,
              }),
            }
          );

          const verifyData =
            await verifyRes.json();

          if (verifyData.success) {
            navigate("/book-order-success", {
              state: {
                order:
                  verifyData.order,

                book,
              },
            });
          }
        },
      };

      const razorpay = new (
        window as any
      ).Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert("Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
          
          {/* LEFT */}
          <div className="space-y-6">
            
            {/* BOOK CARD */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row">
                
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-r from-[#D90621] via-[#EE3344] to-[#ff6b81]">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                      {book.level}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      Class {book.className}
                    </span>
                  </div>

                  <h2 className="mt-3 text-3xl font-black text-slate-900">
                    {book.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {book.description}
                  </p>
                </div>
              </div>
            </div>

            {/* DELIVERY DETAILS */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <User className="h-5 w-5 text-[#D90621]" />

                <h3 className="text-2xl font-bold text-slate-900">
                  Delivery Details
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                
                <input
                  type="text"
                  placeholder="Student Name"
                  value={studentName}
                  onChange={(e) =>
                    setStudentName(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3 outline-none focus:border-[#EE3344]"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3 outline-none focus:border-[#EE3344]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3 outline-none focus:border-[#EE3344] md:col-span-2"
                />

                <textarea
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  rows={4}
                  className="rounded-xl border p-3 outline-none focus:border-[#EE3344] md:col-span-2"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(
                      e.target.value
                    )
                  }
                  className="rounded-xl border p-3 outline-none focus:border-[#EE3344]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="h-fit rounded-2xl border bg-white p-5 shadow-sm">
            
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#D90621]" />

              <h3 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h3>
            </div>

            <div className="space-y-4 text-sm">
              
              <div className="flex justify-between">
                <span>Book Price</span>

                <span>
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>

                <span>
                  ₹{tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span className="text-green-600">
                  FREE
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-2xl font-black text-[#D90621]">
                <span>Total</span>

                <span>
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D90621] via-[#EE3344] to-[#ff6b81] py-3 font-bold text-white transition hover:opacity-90"
            >
              <Lock size={16} />

              Proceed to Payment
            </button>

            <div className="mt-6 space-y-1 text-xs text-slate-500">
              <p>Secure payment via Razorpay</p>

              <p>Book delivery within 5-7 days</p>

              <p>Support available for order issues</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}