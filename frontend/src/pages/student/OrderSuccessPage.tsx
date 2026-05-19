import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;
  const pdf = location.state?.pdf;
  const fileUrl = location.state?.fileUrl;
  console.log("location.state", location.state);
  useEffect(() => {
    if (!order || !pdf) {
      const redirectTo = pdf
        ? `/papers/checkout/${pdf.id}`
        : "/papers";
      navigate(redirectTo);
    }
  }, [order, pdf, navigate]);

  if (!order || !pdf) return null;

  const handleDownload = () => {
    const url = fileUrl
      ? fileUrl
      : `http://localhost:5000/api/upload/payment/download/${order.id}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-green-600 text-white text-center py-10">
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-2 text-sm opacity-90">
            Your question paper is ready.
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="border rounded-xl p-4">
            <span className="font-semibold">Order ID:</span>{" "}
            {order.razorpayOrderId}
          </div>

          <div className="border rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Payment ID:</span>{" "}
                {order.razorpayPaymentId}
              </p>

              <p>
                <span className="font-semibold">Paper:</span>{" "}
                {pdf.title}
              </p>

              <p>
                <span className="font-semibold">Amount:</span> ₹
                {order.amount}
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              Download PDF
            </button>
          </div>

          <button
            onClick={() => navigate("/papers")}
            className="px-4 py-2 rounded-lg border"
          >
            Back to Papers
          </button>
        </div>
      </div>
    </div>
  );
}