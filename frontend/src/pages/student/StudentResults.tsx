import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useLazyQuery } from "@apollo/client/react";

import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";

import Navbar from "../../components/common/homepage/Navbar";
import IllustrationSection from "../../components/common/IllustrationSection";

import { GET_RESULT_FILE } from "../../graphql/queries";

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
  
  // ================= FETCH FILE =================
  useEffect(() => {
    if (year !== "all" && className !== "all") {
      getFile({
        variables: { year, className },
      });
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

console.log("Fetching file from URL:", `${BASE_URL}${fileUrl}`, "Status:", res.status);
        const blob = await res.blob();

        const reader = new FileReader();

        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const data = new Uint8Array(arrayBuffer);

          const workbook = XLSX.read(data, { type: "array" });
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

  // ================= SEARCH =================
  const getRoll = (row: StudentRow) => {
    const key = Object.keys(row).find((k) =>
      k.toLowerCase().includes("roll")
    );
    return key ? row[key] : "";
  };

  useEffect(() => {
    if (!search) {
      setFilteredData(tableData);
      return;
    }

    const filtered = tableData.filter((row) =>
      String(getRoll(row))
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredData(filtered);
  }, [search, tableData]);

  // ================= DYNAMIC COLUMNS =================
  const columns: Column<StudentRow>[] =
    tableData.length > 0
      ? Object.keys(tableData[0])
          .filter((key) => key !== "id") // ❌ hide id column
          .map((key) => ({
            header: key,
            accessor: key,
            render: (value, row) => {
              // 🥇 Highlight rank 1 (optional)
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

      <div className="min-h-screen bg-bg text-text">
        <IllustrationSection />

        {/* YEAR FILTER */}
        <GlobalFilter
          title="Student Results"
          showSearch={false}
          showStatus
          showDate={false}
          showAddButton={false}
          statusOptions={[
            { label: "All Years", value: "all" },
            { label: "2024-25", value: "2024-25" },
            { label: "2023-24", value: "2023-24" },
          ]}
          statusValue={year}
          onStatusChange={(val) => {
            setYear(val);
            setClassName("all");
            setTableData([]);
            setFilteredData([]);
            setSearch("");
            setError("");
          }}
        />

        {/* CLASS SELECT */}
        {year !== "all" && (
          <div className="px-4 mb-4">
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">Select Class</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* SEARCH */}
        {tableData.length > 0 && (
          <div className="px-4 mb-4">
            <input
              type="text"
              placeholder="Search by Roll Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-full max-w-sm"
            />
          </div>
        )}

        {/* TABLE */}
        <div className="px-4">
          {year === "all" ? (
            <p className="text-gray-500">
              Please select a year to view results
            </p>
          ) : className === "all" ? (
            <p className="text-gray-500">Please select a class</p>
          ) : loading || loadingExcel ? (
            <p className="text-blue-500">Fetching results, please wait...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredData.length === 0 ? (
            <p>No results found</p>
          ) : (
            <Table data={filteredData} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentResults;