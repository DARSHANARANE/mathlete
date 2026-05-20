import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { GET_RESULT_YEARS } from "../../graphql/queries";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";

import Navbar from "../../components/common/homepage/Navbar";
import { GET_RESULT_FILE } from "../../graphql/queries";
import SearchBox from "../../components/common/SearchBox";

import {
  FiCalendar,
  FiBook,
  FiLoader,
  FiAlertCircle,
  FiInbox,
} from "react-icons/fi";

import PageBanner from "../../components/common/PageBanner";
import { getFilterYearOptions } from "../../constants/yearOptions";

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
  getResultYears: string[];
};

const StudentResults: React.FC = () => {
  // ================= STATES =================
  const [year, setYear] = useState("all");
  const [className, setClassName] = useState("");

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

    const { data: yearsData } =
      useQuery<YearsData>(GET_RESULT_YEARS);

  const yearOptions = getFilterYearOptions(
  yearsData?.getResultYears
  );

  // ================= FETCH FILE =================
  useEffect(() => {
    if (year !== "all" && className) {
      getFile({
        variables: {
          year,
          className,
        },
      });
    }
  }, [year, className, getFile]);

  // ================= PARSE EXCEL =================
  useEffect(() => {
    if (data && !data.getResultFileByClass) {
      setError(
        "No result file found for selected class"
      );

      setTableData([]);
      setFilteredData([]);

      return;
    }

    const fileUrl =
      data?.getResultFileByClass?.filePath;

    if (!fileUrl) return;

    const fetchExcel = async () => {
      try {
        setLoadingExcel(true);
        setError("");

        const finalUrl = fileUrl.startsWith("http")
          ? fileUrl
          : `${BASE_URL}${fileUrl}`;

        const res = await fetch(finalUrl);

        const blob = await res.blob();

        const reader = new FileReader();

        reader.onload = (e) => {
          const arrayBuffer =
            e.target?.result as ArrayBuffer;

          const excelData =
            new Uint8Array(arrayBuffer);

          const workbook = XLSX.read(excelData, {
            type: "array",
          });

          const sheet =
            workbook.Sheets[
              workbook.SheetNames[0]
            ];

          const rawData =
            XLSX.utils.sheet_to_json<
              Record<string, any>
            >(sheet);

          const jsonData: StudentRow[] =
            rawData.map((row, index) => ({
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
  useEffect(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      setFilteredData(tableData);
      return;
    }

    const filtered = tableData.filter((row) =>
      Object.entries(row).some(
        ([key, value]) =>
          key !== "id" &&
          String(value)
            .toLowerCase()
            .includes(normalizedSearch)
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
              if (
                key.toLowerCase() === "rank" &&
                value === 1
              ) {
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
        <PageBanner
          title="Student Results"
          subtitle="Track performance, celebrate progress, and grow with confidence"
          icon="🏆"
        />

        <div className="p-4 space-y-4">
          {/* FILTERS */}
          <div className="bg-gray-100 px-4 flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-sm border md:flex-row flex-col gap-4">
            {tableData.length > 0 && (
              <div className="flex w-full">
                <h2 className="text-xl font-bold">
                  {data?.getResultFileByClass
                    ?.heading ||
                    "Student Results"}
                </h2>
              </div>
            )}

            <div className="flex justify-end w-full gap-3 md:flex-row flex-col">
              <GlobalFilter
                align="left"
                showSearch={false}
                showStatus
                showClass={year !== "all"}
                hideAllClassOption
                statusOptions={yearOptions}
                statusValue={year}
                onStatusChange={(val) => {
                  setYear(val);
                  setClassName("");
                }}
                classOptions={[...Array(10)].map(
                  (_, i) => ({
                    label: `Class ${i + 1}`,
                    value: `${i + 1}`,
                  })
                )}
                classValue={className}
                onClassChange={setClassName}
              />

              {/* SEARCH */}
              {tableData.length > 0 && (
                <SearchBox
                  value={search}
                  onChange={setSearch}
                  placeholder="Search student by name, roll no, etc."
                />
              )}
            </div>
          </div>

          {/* TABLE */}
          <div className="mb-4">
            {year === "all" ? (
              <div className="flex items-center justify-center gap-4 min-h-[200px] p-5 bg-white/70 backdrop-blur border rounded-xl shadow-sm text-gray-700">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-lg shadow">
                  <FiCalendar size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Select Year
                  </p>

                  <p className="text-xs text-gray-500">
                    Choose a year to view student
                    results
                  </p>
                </div>
              </div>
            ) : !className ? (
              <div className="flex items-center justify-center gap-4 min-h-[200px] p-5 bg-white/70 backdrop-blur border rounded-xl shadow-sm text-gray-700">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-lg shadow">
                  <FiBook size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    No Class Selected
                  </p>

                  <p className="text-xs text-gray-500">
                    Choose a class to see data
                  </p>
                </div>
              </div>
            ) : loading || loadingExcel ? (
              <div className="flex items-center justify-center gap-4 min-h-[200px] p-5 bg-white/70 backdrop-blur border rounded-xl shadow-sm text-gray-700">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-lg shadow">
                  <FiLoader
                    className="animate-spin"
                    size={22}
                  />
                </div>

                <p>
                  Fetching results, please wait...
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center gap-4 min-h-[200px] p-5 bg-white/70 backdrop-blur border rounded-xl shadow-sm text-gray-700">
                <div className="p-3 bg-gradient-to-br from-orange-300 to-red-600 text-white rounded-lg shadow">
                  <FiAlertCircle size={22} />
                </div>

                <p>{error}</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex items-center justify-center gap-4 min-h-[200px] p-5 bg-white/70 backdrop-blur border rounded-xl shadow-sm text-gray-700">
                <div className="p-3 bg-gradient-to-br from-orange-300 to-red-600 text-white rounded-lg shadow">
                  <FiInbox size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    No results found
                  </p>

                  <p className="text-xs text-gray-500">
                    Try changing filters or search
                  </p>
                </div>
              </div>
            ) : (
              <Table
                data={filteredData}
                columns={columns}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResults;