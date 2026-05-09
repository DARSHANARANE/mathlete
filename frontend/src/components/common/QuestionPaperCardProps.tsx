import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    <div className="group relative pt-5">
      {/* back paper 1 */}
      <div className="absolute inset-x-4 top-2 h-full rounded-[28px] bg-[#ece7fa] transition duration-300 group-hover:translate-y-1" />

      {/* back paper 2 */}
      <div className="absolute inset-x-2 top-1 h-full rounded-[28px] bg-[#f4f0ff] transition duration-300 group-hover:translate-y-0.5" />

      {/* main paper */}
      <div className="relative rounded-[28px] bg-white p-4 shadow-[0_18px_40px_rgba(40,20,90,0.08)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_28px_55px_rgba(40,20,90,0.12)]">
        {/* decorative corner */}
        <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[28px] rounded-tr-[28px] bg-[#ffe8ec]" />

        {/* cover */}
        <div className="relative overflow-hidden rounded-[22px] bg-[#faf7ff]">
          {/* side strip */}
          <div className="absolute left-0 top-0 h-full w-4 bg-[#e8def7]" />

          {/* punch holes */}
          <div className="absolute left-[4px] top-6 flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
            ))}
          </div>

    <div className="flex h-36 flex-col items-center justify-center px-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-md">
              <FileText className="h-8 w-8 text-[#E3344A]" />
            </div>

            <span className="rounded-full bg-[#eefbf4] px-3  text-[11px] font-semibold uppercase tracking-wide text-[#19B27B]">
              Question Paper
            </span>

            <h3 className="mt-4 min-h-[64px] text-[1.1rem] font-black leading-snug text-[#1b1444] px-2">
              {pdf.title || pdf.fileName}
            </h3>
          </div>
        </div>

        {/* meta */}
        <div className="mt-5 px-1">
         <div className="mt-5 flex flex-wrap gap-2">
            {pdf.className && (
              <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-bold text-[#4A67FF]">
                Class {pdf.className}
              </span>
            )}

            {pdf.year && (
              <span className="rounded-full bg-[#fff3e8] px-3 py-1 text-xs font-bold text-[#ff7a00]">
                {pdf.year}
              </span>
            )}

            {pdf.pages && (
          <span className="rounded-full bg-[#fff6e8] px-3 py-1 text-xs font-bold text-[#a16207]">
  {pdf.pages ?? 0} Pages
</span>
            )}
          </div>

          {/* footer */}
          <div className="mt-5 flex items-center justify-between border-t border-[#f0ebfa] pt-4">
            <div>
              <p className="text-xs font-medium text-[#8b87a3]">Price</p>
         <p className="text-3xl font-black text-[#E3344A]">
  ₹{pdf.price ?? 0}
</p>
            </div>

            <button
              onClick={handleCheckout}
             className="inline-flex items-center gap-2 rounded-full bg-[#E3344A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d92d42]"
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