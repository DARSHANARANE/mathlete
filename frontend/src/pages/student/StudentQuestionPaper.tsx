import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react/compiled";

import Navbar from "../../components/common/homepage/Navbar";
import GlobalFilter from "../../components/common/GlobalFilter";
import SearchBox from "../../components/common/SearchBox";

import { GET_PDFS, } from "../../graphql/queries";
import QuestionPaperCard from "../../components/common/QuestionPaperCardProps";

type PdfItem = {
  id: string;
  fileName: string;
  filePath: string;
  title?: string;
  className?: string;
  level?: string;
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
  const [level, setLevel] = useState("all");

  const { data, loading } = useQuery<PdfData>(GET_PDFS);



  const filteredPdfs = useMemo(() => {
    return (data?.getPdfs || []).filter((pdf) => {
      const matchSearch =
        !search ||
        pdf.title?.toLowerCase().includes(search.toLowerCase()) ||
        pdf.fileName?.toLowerCase().includes(search.toLowerCase());

      const matchYear = year === "all" || pdf.year === year;

      const matchClass =
        className === "all" || pdf.className === className;
      const matchLevel =
        level === "all" || pdf.level === level;

      return matchSearch && matchYear && matchClass && matchLevel;
    });
  }, [data, search, year, className, level]);

  return (
    <>
      <Navbar />

      <div className=" relative min-h-screen bg-gray-100 text-text">
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
                  classOptions={[...Array(7)].map((_, i) => ({
                    label: `Class ${i + 1}`,
                    value: `${i + 1}`,
                  }))}
                  classValue={className}
                  onClassChange={setClassName}
                  showLevel
                  levelValue={level}
                  onLevelChange={setLevel}
                
                  levelOptions={[

                    {
                      label: "Level 1",
                      value: "Level 1",
                    },

                    {
                      label: "Level 2",
                      value: "Level 2",
                    },
                  ]}
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
  <div className="space-y-6">
    
    {/* Warmup Message */}
    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center">
      <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>

      <h3 className="text-lg font-semibold text-gray-800">
        Preparing Question Papers
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        Server is starting for the first request. Papers will appear automatically.
      </p>
    </div>

    {/* Skeleton Cards */}
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="h-40 rounded-xl bg-gray-200"></div>

          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200"></div>

          <div className="mt-2 h-3 w-1/2 rounded bg-gray-100"></div>

          <div className="mt-6 h-10 rounded-xl bg-gray-200"></div>
        </div>
      ))}
    </div>
  </div>
) : filteredPdfs.length === 0 ? (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
    
    <div className="mb-4 text-5xl">📄</div>

    <h3 className="text-xl font-semibold text-gray-800">
      No Question Papers Found
    </h3>

    <p className="mt-2 max-w-md text-sm text-gray-500">
      Try changing filters or check again later for newly uploaded papers.
    </p>
  </div>
) : (
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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