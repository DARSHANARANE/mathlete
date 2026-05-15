import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react/compiled";
import { Download, FileText } from "lucide-react";

import Navbar from "../../components/common/homepage/Navbar";
import GlobalFilter from "../../components/common/GlobalFilter";
import SearchBox from "../../components/common/SearchBox";

import { GET_PDFS, GET_YEARS } from "../../graphql/queries";
import QuestionPaperCard from "../../components/common/QuestionPaperCardProps";

type YearsData = {
  getYears: string[];
};

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

type PdfData = {
  getPdfs: PdfItem[];
};

export default function StudentQuestionPaperPage() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [className, setClassName] = useState("all");

  const { data: yearsData } = useQuery<YearsData>(GET_YEARS);
  const { data, loading } = useQuery<PdfData>(GET_PDFS);

  const yearOptions = [
    { label: "All Years", value: "all" },
    ...(yearsData?.getYears || []).map((y) => ({
      label: y,
      value: y,
    })),
  ];

  const filteredPdfs = useMemo(() => {
    return (data?.getPdfs || []).filter((pdf) => {
      const matchSearch =
        !search ||
        pdf.title?.toLowerCase().includes(search.toLowerCase()) ||
        pdf.fileName?.toLowerCase().includes(search.toLowerCase());

      const matchYear = year === "all" || pdf.year === year;

      const matchClass =
        className === "all" || pdf.className === className;

      return matchSearch && matchYear && matchClass;
    });
  }, [data, search, year, className]);

  return (
    <>
      <Navbar />

      <div className=" relative min-h-screen bg-gray-100 text-text">
        <div className="absolute top-0 left-0 w-full z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#F7CCD3" fill-opacity="1" d="M0,32L48,53.3C96,75,192,117,288,112C384,107,480,53,576,37.3C672,21,768,43,864,80C960,117,1056,171,1152,202.7C1248,235,1344,245,1392,250.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg>
        </div>
   
        <div className="p-4 space-y-4 z-20  relative">
          {/* Header */}
          <div className="rounded-[26px] bg-white p-5 shadow-[0_14px_30px_rgba(40,20,90,0.05)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* left */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f0ff]">
                  <span className="text-2xl">📘</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-black text-[#1b1444]">
                      Question Papers
                    </h1>

                    <span className="rounded-full bg-[#eefbf4] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#19B27B]">
                      Practice
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#6d6886]">
                    Browse uploaded papers and download instantly.
                  </p>
                </div>
              </div>

              {/* right */}
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <GlobalFilter
                  align="left"
                  showSearch={false}
                  showStatus={false}
                  showClass
                  classOptions={[...Array(12)].map((_, i) => ({
                    label: `Class ${i + 1}`,
                    value: `${i + 1}`,
                  }))}
                  classValue={className}
                  onClassChange={setClassName}
                />

                <div className="min-w-[240px]">
                  <SearchBox
                    value={search}
                    onChange={setSearch}
                    placeholder="Search papers..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <p className="text-gray-500">Loading question papers...</p>
          ) : filteredPdfs.length === 0 ? (
            <p className="text-gray-500">No question papers found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-5">
              {filteredPdfs.map((pdf) => (
                <QuestionPaperCard key={pdf.id} pdf={pdf} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}