import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

// IMPORT BACKGROUNDS
import redBg from "../../assets/red_bg_theme.png";

type PdfItem = {
  id: string;
  fileName: string;
  filePath: string;
  title?: string;
  className?: string;
  year?: string;
  pages?: number;
  price?: number;
};

type Props = {
  pdf: PdfItem;
};

const classThemes: Record<string, any> = {
  "1": {
    bg: redBg,
    btn: "bg-red-500 hover:bg-red-600",
    badge: "bg-red-50 text-red-600",
  },

  "2": {
    bg: redBg,
    btn: "bg-violet-500 hover:bg-violet-600",
    badge: "bg-violet-50 text-violet-600",
  },

  "3": {
    bg: redBg,
    btn: "bg-green-500 hover:bg-green-600",
    badge: "bg-green-50 text-green-600",
  },

  "4": {
    bg: redBg,
    btn: "bg-sky-500 hover:bg-sky-600",
    badge: "bg-sky-50 text-sky-600",
  },

  "5": {
    bg: redBg,
    btn: "bg-pink-500 hover:bg-pink-600",
    badge: "bg-pink-50 text-pink-600",
  },
};

export default function QuestionPaperCard({ pdf }: Props) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(`/papers/checkout/${pdf.id}`, {
      state: { pdf },
    });
  };

  const theme =
    classThemes[pdf.className || "1"] || classThemes["1"];

  return (
    <div className="group w-full max-w-[270px]">
      <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

        {/* TOP HEADER */}
        <div className="relative h-20 z-20 w-full overflow-hidden rounded-t-[22px]">
          {/* bg image */}
          <img
            src={theme.bg}
            alt="theme"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* curve */}
          <div className="absolute bottom-0 left-0 h-7 w-full rounded-t-[100%] bg-white" />

          {/* title */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.25em]">
              Mathlete
            </p>
          </div>
        </div>

        {/* COVER AREA */}
        <div className="relative top-[-20px] flex items-center justify-center w-full flex z-10">
          <div className="relative flex  py-1 w-full gap-2 flex-col justify-center overflow-hidden rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
            <div className="relative z-10 w-full flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/15 backdrop-blur-md">
              <FileText className="h-12 w-12 text-red-500" />
            </div>
            <div className="flex items-center leading-snug w-full justify-center">
            {pdf.year && (
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${theme.badge}`}
              >
                {pdf.year}
              </span>
            )}
          </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 pb-5 pt-4 top-[-20px] relative">
          <h3 className=" mt-2 text-lg font-black leading-snug text-black">
            {pdf.title || pdf.fileName}
          </h3>
          {/* PRICE */}
          <div className="flex items-end justify-between">
            <div>


              <h2 className="mt-1 text-3xl font-black text-slate-900">
                ₹{pdf.price ?? 0}
              </h2>
            </div>

            {/* META */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {pdf.className && (
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700">
                  Class {pdf.className}
                </span>
              )}


              <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700">
                30 Pages
              </span>
            </div>

          </div>


          {/* BUTTON */}
          <Button
            onClick={handleCheckout}
            className={`mt-5 gap-2 `}
          >
            <Download size={15} />
            Download Paper
          </Button>
        </div>
      </div>
    </div>
  );
}