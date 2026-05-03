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

            <div className="min-h-screen bg-gray-100 text-text">
                <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Question Papers
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Browse uploaded papers and download instantly.
                            </p>
                        </div>

                         <div className="flex justify-end w-full gap-3">
                            <GlobalFilter
                                align="left"
                                showSearch={false}
                                showStatus
                                showClass={year !== "all"}
                                statusOptions={yearOptions}
                                statusValue={year}
                                onStatusChange={(val) => {
                                    setYear(val);
                                    setClassName("all");
                                }}
                                classOptions={[...Array(12)].map((_, i) => ({
                                    label: `Class ${i + 1}`,
                                    value: `${i + 1}`,
                                }))}
                                classValue={className}
                                onClassChange={setClassName}
                            />

                            <SearchBox
                                value={search}
                                onChange={setSearch}
                                placeholder="Search papers..."
                            />
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