import { FileText, Lock, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/common/homepage/Navbar";
import { useNavigate } from "react-router-dom";

export default function QuestionPaperCheckoutPage() {
  const location = useLocation();
  const pdf = location.state?.pdf;

  if (!pdf) {
    return <div className="p-10">No item selected</div>;
  }
const navigate = useNavigate();
  const subtotal = Number(pdf.price || 0);
  const tax = Number((subtotal * 0.18).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
const handlePayment = async () => {
  try {
    const orderRes = await fetch(
      "http://localhost:5000/api/upload/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfId: pdf.id,
        }),
      }
    );

    const orderData = await orderRes.json();
const options = {
  key: orderData.key,
  amount: orderData.amount,
  order_id: orderData.orderId,

  handler: async function (response: any) {
    const verifyRes = await fetch(
      "http://localhost:5000/api/upload/payment/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          pdfId: pdf.id,
        }),
      }
    );

    const verifyData = await verifyRes.json();
if (verifyData.success) {
  navigate("/order-success", {
    state: {
      order: verifyData.order,
      pdf: verifyData.pdf,
      fileUrl: verifyData.fileUrl,
    },
  });
}
  },
};

    const razorpay = new (window as any).Razorpay(options);
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
          {/* Left */}
          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 h-fit">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {pdf.title || pdf.fileName}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {pdf.className && `Class ${pdf.className}`}{" "}
                {pdf.year && `• ${pdf.year}`}{" "}
                {pdf.pages && `• ${pdf.pages} pages`}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ₹{pdf.price}
              </div>

              <button className="mt-3 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-xl border p-5 h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-5">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal (1 items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹0.00</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold text-blue-600">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

              <button
                  onClick={handlePayment}
                  className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Lock size={16} />
                  Proceed to Checkout
                </button>

            <div className="mt-6 text-xs text-slate-500 space-y-1">
              <p>Secure payment via Razorpay</p>
              <p>Instant download after payment</p>
              <p>7-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}