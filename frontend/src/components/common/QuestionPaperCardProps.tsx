// import { Download, FileText } from "lucide-react";

// type PdfItem = {
//   id: string;
//   fileName: string;
//   filePath: string;
//   title?: string;
//   className?: string;
//   year?: string;
//   pages?: number;
//   price?: number;
// };

// type Props = {
//   pdf: PdfItem;
// };

// export default function QuestionPaperCard({ pdf }: Props) {
//   return (
//     <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition">
//       {/* Top */}
//       <div className="h-36 bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
//         <FileText className="w-12 h-12 text-white" />
//       </div>

//       {/* Body */}
//       <div className="p-5 space-y-3">
//         <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
//           POPULAR
//         </span>
//       <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[20px]">
//           {pdf.fileName}
//         </h3>
//         <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[20px]">
//           {pdf.title}
//         </h3>

//         <div className="text-sm text-gray-500 space-y-1">
//           <p>
//             {pdf.className && `Class ${pdf.className}`}{" "}
//             {pdf.year && `• ${pdf.year}`}
//           </p>

//           <p>{pdf.pages ? `${pdf.pages} pages` : ""}</p>
//         </div>

//         <div className="border-t pt-4 flex items-center justify-between">
//           <span className="text-2xl font-bold text-blue-700">
//             ₹{pdf.price ?? 0}
//           </span>

//           <a
//             href={`http://localhost:5000${pdf.filePath}`}
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//           >
//             <Download size={16} />
//             Download
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="h-36 bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center">
        <FileText className="w-12 h-12 text-white" />
      </div>

      <div className="p-5 space-y-3">
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
          POPULAR
        </span>

        <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[56px]">
          {pdf.title || pdf.fileName}
        </h3>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            {pdf.className && `Class ${pdf.className}`}{" "}
            {pdf.year && `• ${pdf.year}`}
          </p>
          <p>{pdf.pages ? `${pdf.pages} pages` : ""}</p>
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-700">
            ₹{pdf.price ?? 0}
          </span>

          <button
            onClick={handleCheckout}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}