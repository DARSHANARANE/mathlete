import React, { useState } from "react";
import GlobalFilter from "../../components/common/GlobalFilter";
import Table from "../../components/common/table/tablelayout";
import type { Column } from "../../components/common/table/tablelayout";
import DeleteModal from "../../components/common/Modal/DeleteModal";
import { useQuery } from "@apollo/client/react";
import { GET_PDFS, GET_PDF_YEARS } from "../../graphql/queries";
import { usePdfActions } from "../../hooks/usePdfActions";
import PdfUploadModal from "../../components/common/Modal/PdfUploadModal";
import { FaTrash, FaEdit } from "react-icons/fa";
import { getFilterYearOptions } from "../../constants/yearOptions";

// =======================
// TYPES
// =======================
type Pdf = {
  id: string;
  fileName: string;
  title: string;
  className: string;
  year: string;
  level?: string;
  price: number;
  uploadedAt: string;
};

type QueryData = {
  getPdfs: Pdf[];
};

type YearsData = {
  getPdfYears: string[];
};

// =======================
// COMPONENT
// =======================
const QuestionPaPer: React.FC = () => {
  const [year, setYear] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Pdf | null>(null);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [search, setSearch] = useState("");

  // =======================
  // GRAPHQL
  // =======================
  const { data, loading, refetch } = useQuery<QueryData>(GET_PDFS);
  const files = data?.getPdfs || [];

  const { uploadPdf, deletePdf, updatePdf } = usePdfActions();
    const { data: yearsData } =
      useQuery<YearsData>(GET_PDF_YEARS);

  const yearOptions = getFilterYearOptions(
  yearsData?.getPdfYears
);

  // =======================
  // SEARCH + FILTER
  // =======================
  const filtered = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return files.filter((item) => {
      const matchYear = year === "all" || item.year === year;

      if (!normalizedSearch) return matchYear;

      return (
        matchYear &&
        [item.fileName, item.title]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [files, year, search]);

  // =======================
  // CREATE + EDIT HANDLER
  // =======================
  const handleUpload = async (formData: any) => {
    try {
      if (editData) {
        // ✏️ EDIT
        await updatePdf(editData.id, {
          title: formData.title,
          price: Number(formData.price),
        });
      } else {
        // ➕ CREATE
          await uploadPdf({
          file: formData.file,
          title: formData.title,
          className: formData.className,
          year: formData.year,
          level: formData.level,
          price: Number(formData.price),
        });
      }

      await refetch();
      setOpenUploadModal(false);
      setEditData(null);

    } catch (err) {
      console.error("UPLOAD/UPDATE ERROR:", err);
    }
  };

  // =======================
  // TABLE COLUMNS
  // =======================
  const columns: Column<Pdf>[] = [
    { header: "File Name", accessor: "fileName" },

    {
      header: "Class",
      accessor: "className",
      render: (value) => `Class ${value}`,
    },

    { header: "Year", accessor: "year" },

    { header: "Title", accessor: "title" },

    {
      header: "Level",
      accessor: "level",
    },

    {
      header: "Price (₹)",
      accessor: "price",
      render: (value) => `₹${value}`,
    },

    {
      header: "Uploaded Date",
      accessor: "uploadedAt",
      render: (value) =>
        value ? new Date(Number(value)).toLocaleDateString("en-GB") : "N/A",
    },

    {
      header: "Actions",
      accessor: "id",
      render: (_, row) => (
        <div className="flex gap-2">
          {/* ✏️ EDIT */}
          <button
            onClick={() => {
              setEditData(row);
              setOpenUploadModal(true);
            }}
            className="p-2 bg-blue-50 text-blue-500 rounded-md"
          >
            <FaEdit />
          </button>

          {/* 🗑 DELETE */}
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-2 bg-red-50 text-red-500 rounded-md"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-2 space-y-4">
      {/* FILTER */}
      <GlobalFilter
        title="Question Papers"
        searchValue={search}
        onSearch={setSearch}
        showStatus
        showAddButton
        addLabel="Upload PDF"
        onAddClick={() => {
          setEditData(null); // ✅ reset edit
          setOpenUploadModal(true);
        }}
        statusOptions={yearOptions}
        statusValue={year}
        onStatusChange={setYear}
        searchPlaceholder="Search by File Name or Title"
      />

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table data={filtered} columns={columns} />
        )}
      </div>

      {/* ✅ UPLOAD / EDIT MODAL */}
      <PdfUploadModal
        open={openUploadModal}
        onClose={() => {
          setOpenUploadModal(false);
          setEditData(null);
        }}
        onUpload={handleUpload}
        initialData={
          editData
            ? {
                file: null,
                title: editData.title,
                className: editData.className,
                year: editData.year,
                level: String(editData.level || ""),
                price: String(editData.price),
              }
            : null
        }
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onDelete={async () => {
          if (!deleteId) return;

          try {
            await deletePdf(deleteId);
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

export default QuestionPaPer;