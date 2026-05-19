import { useEffect } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle2,
  Download,
  Receipt,
  BookOpen,
} from "lucide-react";

import Navbar from "../../components/common/homepage/Navbar";

export default function BookOrderSuccessPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const order = location.state?.order;

  const book = location.state?.book;

  useEffect(() => {
    if (!order || !book) {
      navigate("/books");
    }
  }, [order, book, navigate]);

  if (!order || !book) return null;

  // ==============================
  // DOWNLOAD INVOICE
  // ==============================

const handleInvoiceDownload = () => {
window.open(
  `http://localhost:5000/api/upload/invoice/${order.id}`,
  "_blank"
);
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* SUCCESS HEADER */}

          <div className="bg-gradient-to-r from-[#D90621] via-[#EE3344] to-[#ff6b81] text-white text-center py-12 px-6">
            <CheckCircle2 className="mx-auto w-16 h-16 mb-4" />

            <h1 className="text-4xl font-bold">
              Order Successful!
            </h1>

            <p className="mt-3 text-sm opacity-90">
              Your book order has been
              placed successfully.
            </p>
          </div>

          {/* CONTENT */}

          <div className="p-6 md:p-8 space-y-6">
            {/* ORDER INFO */}

            <div className="border rounded-2xl p-5 bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-5 h-5 text-[#D90621]" />

                <h2 className="text-xl font-semibold">
                  Order Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold">
                    {
                      order.razorpayOrderId
                    }
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Payment ID
                  </p>

                  <p className="font-semibold">
                    {
                      order.razorpayPaymentId
                    }
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Invoice Number
                  </p>

                  <p className="font-semibold">
                    {order.invoiceNumber}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Amount Paid
                  </p>

                  <p className="font-semibold text-green-600">
                    ₹{order.amount}
                  </p>
                </div>
              </div>
            </div>

            {/* BOOK INFO */}

            <div className="border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#D90621]" />

                <h2 className="text-xl font-semibold">
                  Book Details
                </h2>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">
                    Title:
                  </span>{" "}
                  {book.title}
                </p>

                <p>
                  <span className="font-semibold">
                    Class:
                  </span>{" "}
                  {book.className}
                </p>

                <p>
                  <span className="font-semibold">
                    Level:
                  </span>{" "}
                  {book.level}
                </p>

                <p>
                  <span className="font-semibold">
                    Price:
                  </span>{" "}
                  ₹{book.price}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={
                  handleInvoiceDownload
                }
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D90621] via-[#EE3344] to-[#ff6b81] text-white font-medium flex items-center gap-2 hover:opacity-90"
              >
                <Download className="w-4 h-4" />

                Download Invoice
              </button>

              <button
                onClick={() =>
                  navigate("/books")
                }
                className="px-5 py-3 rounded-xl border font-medium hover:bg-gray-50"
              >
                Back to Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}