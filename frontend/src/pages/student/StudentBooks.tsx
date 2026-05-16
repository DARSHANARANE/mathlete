import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react/compiled";

import Navbar from "../../components/common/homepage/Navbar";
import GlobalFilter from "../../components/common/GlobalFilter";
import SearchBox from "../../components/common/SearchBox";

import { GET_PDFS, GET_YEARS } from "../../graphql/queries";
import  { BuyBookCard } from "../../components/common/QuestionPaperCardProps";

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

export default function studentBooks() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [className, setClassName] = useState("all");
  const [level, setLevel] = useState("all");
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
        <div className="p-4 space-y-4 z-20  relative">
          {/* Header */}
          <div className="rounded-[26px] bg-white p-5 shadow-[0_14px_30px_rgba(40,20,90,0.05)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* left */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f0ff]">
                  <span className="text-2xl">📘</span>
                </div>

               
                  <div className="flex items-center">
                    <h1 className="text-3xl font-black text-[#1b1444]">
                      Books
                    </h1>
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
                    { label: "Level 1", value: "level1" },
                    { label: "Level 2", value: "level2" },
                  ]}
                />

                <div className="min-w-[240px]">
                  <SearchBox
                    value={search}
                    onChange={setSearch}
                    placeholder="Search Books..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <p className="text-gray-500">Loading books...</p>
          ) : filteredPdfs.length === 0 ? (
            <p className="text-gray-500">No books found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-5">
              {filteredPdfs.map((pdf) => (
                <BuyBookCard  />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}