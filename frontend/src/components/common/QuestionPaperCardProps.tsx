import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

type PdfItem = {
  id: string;
  fileName: string;
  filePath: string;
  title?: string;
  className?: string;
  level?: number | string;
  year?: string;
  pages?: number;
  price?: number;
};

type Props = {
  pdf: PdfItem;
};


export default function QuestionPaperCard({ pdf }: Props) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(`/papers/checkout/${pdf.id}`, {
      state: { pdf },
    });
  };

  return (
  <div className="group w-full">
  <div className="overflow-hidden rounded-3xl border border-red-100/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

    <div className="relative flex w-full flex-col overflow-hidden rounded-3xl">

      {/* Soft Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-100/40 blur-3xl"></div>

      {/* TOP */}
      <div className="relative bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-5 min-h-[145px] border-b border-red-100/60">

        {/* Tags */}
        <div className="flex items-center justify-between">

          {/* Level */}
          <span className="rounded-full border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1 text-[11px] font-bold text-amber-700 shadow-sm">
              {pdf.level}
          </span>

          {/* Class */}
          <span className="rounded-full border border-red-100 bg-white px-3 py-1 text-[11px] font-bold text-red-500 shadow-sm">
            Class {pdf.className}
          </span>
        </div>

        {/* Title */}
        <div className="mt-5 flex items-start gap-3">

          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-400 shadow-[0_10px_20px_rgba(239,68,68,0.25)]">
            <FileText className="h-6 w-6 text-white" />
          </div>

          {/* Text */}
          <div>
            <h3 className="mt-1 line-clamp-2 text-lg font-black leading-snug text-gray-800">
            {pdf.title || pdf.fileName}
            </h3>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between px-5 pb-5 pt-3">

        {/* PRICE */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Price
          </p>

          <h2 className="mt-1 text-3xl font-black text-gray-900">
           ₹{pdf.price ?? 0}
          </h2>
        </div>

        {/* BUTTON */}
        <button
           onClick={handleCheckout}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
          <Download size={15} />
           Download
        </button>
      </div>
    </div>
  </div>
</div>
  );
}

type BuyBookCardProps = {
  title: string;
  description?: string;
  price?: number;
  className?: string;
  level?: string;
  onBuy?: () => void;
};

export const BuyBookCard: React.FC<
  BuyBookCardProps
> = ({
  title,
  description,
  price,
  className,
  level,
  onBuy,
}) => {
    return (
    <div className="group w-full">
  <div className="overflow-hidden rounded-3xl border border-red-100/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(239,68,68,0.12)]">

    <div className="relative flex w-full flex-col overflow-hidden">

      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-100/40 blur-3xl"></div>

      {/* TOP */}
      <div className="relative min-h-[150px] border-b border-red-100/60 bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-5">

        {/* TAGS */}
        <div className="flex items-center justify-between">

          {/* LEVEL */}
          <span className="rounded-full border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1 text-[11px] font-bold text-amber-700 shadow-sm">
            {level || "Level 1"}
          </span>

          {/* CLASS */}
          <span className="rounded-full border border-red-100 bg-white/90 px-3 py-1 text-[11px] font-bold text-red-500 shadow-sm backdrop-blur">
            Class {className}
          </span>
        </div>

        {/* TITLE SECTION */}
        <div className="mt-5 flex items-start gap-4">

          {/* ICON */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-400 shadow-[0_10px_25px_rgba(239,68,68,0.25)]">
            <FileText className="h-7 w-7 text-white" />
          </div>

          {/* TEXT */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
              Study Material
            </p>

            <h3 className="mt-1 line-clamp-2 text-xl font-black leading-snug text-gray-800">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="min-h-[72px] px-5 pt-4">
        <p className="line-clamp-2 text-[14px] leading-6 text-gray-600">
          {description || "No description available."}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex items-end justify-between px-5 pb-5 pt-3">

        {/* PRICE */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Price
          </p>

          <h2 className="mt-1 text-3xl font-black text-gray-900">
            ₹{price || 0}
          </h2>
        </div>

        {/* BUTTON */}
        <button
          onClick={onBuy}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
          <Download size={16} />
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>
    );
  };