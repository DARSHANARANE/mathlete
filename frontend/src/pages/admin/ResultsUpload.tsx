import React, { useState } from "react";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";
import { FaTrash } from "react-icons/fa";

import DeleteModal from "../../components/common/Modal/DeleteModal";
import ResultUploadModal from "../../components/common/Modal/ResultUploadModal";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_RESULT_FILES } from "../../graphql/queries";
import { DELETE_RESULT_FILE } from "../../graphql/mutations";

import { useFileUpload } from "../../hooks/useFileUpload";
import { GET_YEARS } from "../../graphql/queries";

type ResultFile = {
  id: string;
  fileName: string;
  year: string;
  className: string;
  heading: string;
  uploadedAt: string;
};

type QueryData = {
  getResultFiles: ResultFile[];
};
type YearsData = {
  getYears: string[];
};
const ResultsUpload: React.FC = () => {
  const [year, setYear] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const { data, loading, refetch } = useQuery<QueryData>(GET_RESULT_FILES);
  const [deleteFile] = useMutation(DELETE_RESULT_FILE);
  const { uploadFile } = useFileUpload();

  const files = data?.getResultFiles || [];
  const { data: yearsData } = useQuery<YearsData>(GET_YEARS);
  const yearOptions = [
    { label: "All Years", value: "all" },
    ...(yearsData?.getYears || []).map((y: string) => ({
      label: y,
      value: y,
    })),
  ];
  const filtered = files.filter((f) =>
    year === "all" ? true : f.year === year
  );

  // ✅ FIXED: match modal signature
  const handleUpload = async (
    file: File | null,
    year: string,
    className: string,
    heading: string
  ) => {
    if (!file) return;

    setUploading(true);

    try {
      await uploadFile(file, year, className, heading);

      console.log("UPLOAD SUCCESS");

      await refetch();
      setOpenUploadModal(false);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    } finally {
      setUploading(false);
    }
  };

  const columns: Column<ResultFile>[] = [
    { header: "File Name", accessor: "fileName" },
   {
      header: "Class",
      accessor: "className",
      render: (value) => `Class ${value}`,
    },
    { header: "Year", accessor: "year" },
    { header: "Heading", accessor: "heading" },
    {
      header: "Uploaded Date",
      accessor: "uploadedAt",
      render: (value) =>
        value ? new Date(Number(value)).toLocaleDateString() : "N/A",
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_, row) => (
        <button
          onClick={() => setDeleteId(row.id)}
          className="p-2 bg-red-50 text-red-500 rounded-md"
        >
          <FaTrash />
        </button>
      ),
    },
  ];
  return (
    <div className="p-2 space-y-4">

      {/* FILTER */}
     <GlobalFilter
      title="Result Files"
      showSearch={false}
      showStatus
      showAddButton
      addLabel={uploading ? "Uploading..." : "Upload Result"}
      onAddClick={() => setOpenUploadModal(true)}
      statusOptions={yearOptions}
      statusValue={year}
      onStatusChange={setYear}
    />

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table data={filtered} columns={columns} />
        )}
      </div>

      {/* ✅ UPLOAD MODAL */}
      <ResultUploadModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        onUpload={handleUpload} // ✅ fixed
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onDelete={async () => {
          if (!deleteId) return;

          try {
            await deleteFile({
              variables: { id: deleteId },
            });

            console.log("DELETE SUCCESS");

            await refetch();
          } catch (err) {
            console.error("DELETE ERROR:", err);
          } finally {
            setDeleteId(null);
          }
        }}
      />
    </div>
  );
};

export default ResultsUpload;