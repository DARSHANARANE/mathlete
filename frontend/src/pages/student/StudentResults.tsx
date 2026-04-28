import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useLazyQuery, useQuery } from "@apollo/client/react";

import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";

import Navbar from "../../components/common/homepage/Navbar";
import IllustrationSection from "../../components/common/IllustrationSection";
import { GET_YEARS, GET_RESULT_FILE } from "../../graphql/queries";
import SearchBox from "../../components/common/SearchBox";
import { FiCalendar, FiBook, FiLoader, FiAlertCircle, FiInbox } from "react-icons/fi";

// ================= TYPES =================
type StudentRow = {
  id: string | number;
  [key: string]: any;
};

type ResultFileResponse = {
  getResultFileByClass: {
    fileName: string;
    filePath: string;
    year: string;
    className: string;
    heading?: string;
  } | null;
};

type ResultFileVars = {
  year: string;
  className: string;
};

type YearsData = {
  getYears: string[];
};

const StudentResults: React.FC = () => {
  const [year, setYear] = useState("all");
  const [className, setClassName] = useState("all");

  const [tableData, setTableData] = useState<StudentRow[]>([]);
  const [filteredData, setFilteredData] = useState<StudentRow[]>([]);
  const [search, setSearch] = useState("");

  const [loadingExcel, setLoadingExcel] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:5000";

  // ================= GRAPHQL =================
  const [getFile, { data, loading }] = useLazyQuery<
    ResultFileResponse,
    ResultFileVars
  >(GET_RESULT_FILE);

  const { data: yearsData } = useQuery<YearsData>(GET_YEARS);

  const yearOptions = [
    { label: "All Years", value: "all" },
    ...(yearsData?.getYears || []).map((y: string) => ({
      label: y,
      value: y,
    })),
  ];

  // ================= FETCH FILE =================
  useEffect(() => {
    if (year !== "all" && className !== "all") {
      getFile({ variables: { year, className } });
    }
  }, [year, className, getFile]);

  // ================= PARSE EXCEL =================
  useEffect(() => {
    if (data && !data.getResultFileByClass) {
      setError("No result file found for selected class");
      setTableData([]);
      setFilteredData([]);
      return;
    }

    const fileUrl = data?.getResultFileByClass?.filePath;
    if (!fileUrl) return;

    const fetchExcel = async () => {
      try {
        setLoadingExcel(true);
        setError("");

        const res = await fetch(`${BASE_URL}${fileUrl}`);
        const blob = await res.blob();

        const reader = new FileReader();

        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const excelData = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(excelData, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          const rawData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
          const jsonData: StudentRow[] = rawData.map((row, index) => ({
            id:
              row["ROLL NO"] ||
              row["Roll No"] ||
              row["rollNumber"] ||
              index + 1,
            ...row,
          }));

          setTableData(jsonData);
          setFilteredData(jsonData);
          setLoadingExcel(false);
        };

        reader.readAsArrayBuffer(blob);
      } catch (err) {
        console.error(err);
        setError("Failed to load result file");
        setLoadingExcel(false);
      }
    };

    fetchExcel();
  }, [data]);

  // ================= SEARCH (UPDATED) =================
  useEffect(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      setFilteredData(tableData);
      return;
    }

    const filtered = tableData.filter((row) =>
      Object.entries(row).some(
        ([key, value]) =>
          key !== "id" &&
          String(value).toLowerCase().includes(normalizedSearch)
      )
    );

    setFilteredData(filtered);
  }, [search, tableData]);

  // ================= DYNAMIC COLUMNS =================
  const columns: Column<StudentRow>[] =
    tableData.length > 0
      ? Object.keys(tableData[0])
        .filter((key) => key !== "id")
        .map((key) => ({
          header: key,
          accessor: key,
          render: (value) => {
            if (key.toLowerCase() === "rank" && value === 1) {
              return "🥇 " + value;
            }
            return value;
          },
        }))
      : [];

  // ================= UI =================
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 text-text">
        <IllustrationSection />
        <div className="p-4 space-y-4">
          {/* YEAR FILTER */}
          <GlobalFilter
            showSearch={false}
            showStatus
            showClass={year !== "all"}   // ✅ condition here

            statusOptions={yearOptions}
            statusValue={year}
            onStatusChange={(val) => {
              setYear(val);
              setClassName("all");
            }}

            classOptions={[...Array(10)].map((_, i) => ({
              label: `Class ${i + 1}`,
              value: `${i + 1}`,
            }))}

            classValue={className}
            onClassChange={setClassName}
          />

          {/* HEADER + SEARCH */}
          {tableData.length > 0 && (
            <div className="px-4 flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-sm border">

              <>
                <h2 className="text-xl font-bold">
                  {data?.getResultFileByClass?.heading || "Student Results"}
                </h2>

                <SearchBox
                  value={search}
                  onChange={setSearch}
                  placeholder="Search student by name, roll no, etc."
                />
              </>

            </div>
          )}

          {/* TABLE */}
     <div className="mb-4">
  {year === "all" ? (
    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg text-gray-600">
      <FiCalendar size={20} />
      <p>Please select a year to view results</p>
    </div>

  ) : className === "all" ? (
    <div className="flex items-center gap-3 p-4 bg-white border rounded-lg text-gray-600">
      <FiBook size={20} />
      <p>Please select a class</p>
    </div>

  ) : loading || loadingExcel ? (
    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-600">
      <FiLoader className="animate-spin" size={20} />
      <p>Fetching results, please wait...</p>
    </div>

  ) : error ? (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
      <FiAlertCircle size={20} />
      <p>{error}</p>
    </div>

  ) : filteredData.length === 0 ? (
<div className="flex flex-col items-center justify-center p-8 bg-gray-50 border rounded-lg text-gray-500">
  <FiInbox size={32} className="mb-2" />
  <p className="font-medium">No results found</p>
  <p className="text-sm">Try changing filters or search</p>
</div>

  ) : (
    <Table data={filteredData} columns={columns} />
  )}
</div>
        </div>
      </div>
    </>
  );
};

export default StudentResults;