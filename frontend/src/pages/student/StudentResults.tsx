import React, { useState } from "react";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";
import { useQuery } from "@apollo/client/react";
import { GET_STUDENT_RESULTS } from "../../graphql/queries";

import Navbar from "../../components/common/homepage/Navbar";
import IllustrationSection from "../../components/common/IllustrationSection";

type StudentResult = {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  schoolName: string;
  score: number;
  rank: number;
  meritTitle: string;
  year: string;
};

type QueryData = {
  getStudentResults: StudentResult[];
};

const StudentResults: React.FC = () => {
  const [year, setYear] = useState("all");
  const [className, setClassName] = useState("all");

  // 🔥 Fetch only when needed
  const { data, loading } = useQuery<QueryData>(GET_STUDENT_RESULTS, {
    variables: {
      year: year === "all" ? null : year,
      class: className === "all" ? null : className,
    },
    skip: year === "all", // ❗ don't fetch until year selected
  });

  const results = data?.getStudentResults || [];

  const columns: Column<StudentResult>[] = [
    { header: "Name", accessor: "studentName" },
    { header: "Roll No", accessor: "rollNumber" },

    // ✅ Render class properly
    {
      header: "Class",
      accessor: "class",
      render: (value) => `Class ${value}`,
    },

    { header: "School", accessor: "schoolName" },
    { header: "Score", accessor: "score" },
    { header: "Rank", accessor: "rank" },
    { header: "Merit", accessor: "meritTitle" },
  ];

  // 🔥 Reset class when year changes
  const handleYearChange = (value: string) => {
    setYear(value);
    setClassName("all");
  };

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
          onStatusChange={handleYearChange}
        />

        {/* ✅ SHOW CLASS FILTER ONLY AFTER YEAR SELECTED */}
        {year !== "all" && (
          <div className="px-4 mb-4">
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All Classes</option>

              {/* 🔥 dynamic or static options */}
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* TABLE */}
        <div className="px-4">
          {year === "all" ? (
            <p className="text-gray-500">
              Please select a year to view results
            </p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <Table data={results} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentResults;