import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

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


export default function QuestionPaperCard({ pdf }: Props) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(`/papers/checkout/${pdf.id}`, {
      state: { pdf },
    });
  };
  return (
    <div className="group w-full max-w-[250px]">
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">



        {/* COVER AREA */}
        <div className="flex items-center justify-center w-full flex z-10">
          <div className="relative flex  py-1 w-full gap-2 flex-col justify-center overflow-hidden rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
            <div className="relative z-10 w-full flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/15 backdrop-blur-md">
              <FileText className="h-12 w-12 text-red-500" />
            </div>
            <div className="flex items-center leading-snug w-full justify-center">
              {pdf.year && (
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase}`}
                >
                  {pdf.year}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 pb-5 pt-4">
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
          <div className={`mt-3 flex items-center justify-center w-full`}> 
            <Button
              onClick={handleCheckout}
            >
              <Download size={15} />
              Download Paper
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export const BuyBookCard = () => {
  return (
    <div className="group w-full max-w-[250px]">
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
        {/* COVER AREA */}
        <div className="flex items-center justify-center w-full flex z-10">
          <div className="relative flex  py-1 w-full gap-2 flex-col justify-center overflow-hidden rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
           
            <div className="px-5 pb-5 pt-4">
              <h3 className=" mt-2 text-lg font-black leading-snug text-black">
               Level 1 Practice Paper 1
              </h3>
              {/* PRICE */}
              <div className="flex items-end justify-between">
                <div>


                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    ₹300
                  </h2>
                </div>

                {/* META */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700">
                    Class 10
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700">
                    30 Pages
                  </span>
                </div>

              </div>


              {/* BUTTON */}
              <div className={`mt-3 flex items-center justify-center w-full`}>
                <Button
                >
                  <Download size={15} />
                  Download Book
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}