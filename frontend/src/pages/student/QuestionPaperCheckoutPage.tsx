import {
  FileText,
  Lock,
  Trash2,
} from "lucide-react";

import { useLocation } from "react-router-dom";

import Navbar from "../../components/common/homepage/Navbar";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client/react";

import {
  CREATE_RAZORPAY_ORDER,
  VERIFY_PDF_PAYMENT,
} from "../../graphql/mutations";

export default function QuestionPaperCheckoutPage() {
  const location = useLocation();

  const navigate = useNavigate();

  const pdf = location.state?.pdf;

  // ==============================
  // GRAPHQL MUTATIONS
  // ==============================

  const [createOrder] = useMutation<
    {
      createRazorpayOrder: {
        id: string;
        amount: number;
        currency: string;
      };
    },
    { amount: number }
  >(CREATE_RAZORPAY_ORDER);

  const [verifyPayment] =
    useMutation<any, any>(
      VERIFY_PDF_PAYMENT
    );

  // ==============================
  // EMPTY STATE
  // ==============================

  if (!pdf) {
    return (
      <div className="p-10">
        No item selected
      </div>
    );
  }

  // ==============================
  // PRICE CALCULATION
  // ==============================

  const subtotal = Number(
    pdf.price || 0
  );

  const tax = Number(
    (subtotal * 0.18).toFixed(2)
  );

  const total = Number(
    (subtotal + tax).toFixed(2)
  );

  // ==============================
  // HANDLE PAYMENT
  // ==============================

  const handlePayment =
    async () => {
      try {
        // CREATE RAZORPAY ORDER
        const { data } =
          await createOrder({
            variables: {
              amount: Math.round(
                total
              ),
            },
          });

        const order =
          data?.createRazorpayOrder;

        if (!order) {
          throw new Error("Order creation failed.");
        }

        const options = {
          key: import.meta.env
            .VITE_RAZORPAY_KEY_ID,

          amount: order.amount,

          currency:
            order.currency,

          order_id: order.id,

          name: "Mathlete",

          description:
            "Question Paper Purchase",

          handler: async (
            response: any
          ) => {
            try {
              // VERIFY PAYMENT
              const verifyRes =
                await verifyPayment({
                  variables: {
                    pdfId: pdf.id,

                    amount:
                      total,

                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,
                  },
                });

              const verifyData =
                verifyRes.data
                  .verifyPdfPayment;

              if (
                verifyData.success
              ) {
                navigate("/order-success", {
                  state: {
                    pdf,

                    fileUrl: verifyData.downloadUrl,

                    order: {
                      id: verifyData.orderId,

                      amount: verifyData.amount,

                      razorpayOrderId:
                        verifyData.razorpayOrderId,

                      razorpayPaymentId:
                        verifyData.razorpayPaymentId,
                    },
                  },
                });
              } else {
                alert(
                  "Payment verification failed"
                );
              }
            } catch (err) {
              console.error(err);

              alert(
                "Payment verification failed"
              );
            }
          },

          prefill: {
            name: "Student",

            email:
              "student@gmail.com",
          },

          notes: {
            pdfTitle:
              pdf.title,
          },

          theme: {
            color: "#D90621",
          },
        };

        const razorpay =
          new (
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

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
          {/* LEFT SIDE */}

          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 h-fit">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {pdf.title ||
                  pdf.fileName}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {pdf.className &&
                  `Class ${pdf.className}`}{" "}
                {pdf.year &&
                  `• ${pdf.year}`}{" "}
                {pdf.pages &&
                  `• ${pdf.pages} pages`}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ₹{pdf.price}
              </div>

              <button
                onClick={() =>
                  navigate("/papers")
                }
                className="mt-3 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Trash2 size={14} />

                Remove
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white rounded-xl border p-5 h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-5">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>
                  Subtotal (1 item)
                </span>

                <span>
                  ₹
                  {subtotal.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>
                  Discount
                </span>

                <span>
                  -₹0.00
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Tax (18% GST)
                </span>

                <span>
                  ₹
                  {tax.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold text-blue-600">
                <span>Total</span>

                <span>
                  ₹
                  {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}

            <button
              onClick={
                handlePayment
              }
              className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Lock size={16} />

              Proceed to Checkout
            </button>

            {/* FOOTER */}

            <div className="mt-6 text-xs text-slate-500 space-y-1">
              <p>
                Secure payment via
                Razorpay
              </p>

              <p>
                Instant download
                after payment
              </p>

              <p>
                7-day money-back
                guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}