import React, { useState, useEffect } from "react";
import BaseModal from "./BaseModal";

type PdfFormData = {
  file?: File | null;
  title: string;
  className: string;
  year: string;
  price: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (data: PdfFormData) => void;
  initialData?: any | null; // for edit
};

const PdfUploadModal: React.FC<Props> = ({
  open,
  onClose,
  onUpload,
  initialData,
}) => {
  const [form, setForm] = useState<PdfFormData>({
    file: null,
    title: "",
    className: "",
    year: "",
    price: "",
  });

  const isEdit = !!initialData;

  // ======================
  // Prefill for edit
  // ======================
  useEffect(() => {
    if (initialData) {
      setForm({
        file: null,
        title: initialData.title || "",
        className: initialData.className || "",
        year: initialData.year || "",
        price: String(initialData.price || ""),
      });
    } else {
      setForm({
        file: null,
        title: "",
        className: "",
        year: "",
        price: "",
      });
    }
  }, [initialData]);

  // ======================
  // Handlers
  // ======================
  const handleChange = (key: keyof PdfFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!isEdit && !form.file) {
      alert("Please upload a PDF file");
      return;
    }

    if (!form.price) {
      alert("Price is required");
      return;
    }

    onUpload(form);
  };

  // ======================
  // UI
  // ======================
  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title={isEdit ? "Edit PDF" : "Upload PDF"}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {isEdit ? "Update" : "Upload"}
          </button>
        </>
      }
    >
      <div className="space-y-4">

        {/* FILE INPUT */}
        {!isEdit && (
          <div>
            <label className="block text-sm mb-1">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                handleChange("file", e.target.files?.[0] || null)
              }
            />
          </div>
        )}

        {/* TITLE */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        {/* CLASS */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Class (e.g. 2)"
         value={isEdit ? `class ${form.className}` : ""}
          disabled={isEdit}
          onChange={(e) => handleChange("className", e.target.value)}
        />

        {/* YEAR */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Year (e.g. 2024-25)"
          value={form.year}
          disabled={isEdit}
          onChange={(e) => handleChange("year", e.target.value)}
        />

        {/* PRICE */}
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Price (₹)"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        {/* INFO */}
        {!isEdit && (
          <p className="text-xs text-gray-500">
            Pages will be automatically calculated after upload 📄
          </p>
        )}
      </div>
    </BaseModal>
  );
};

export default PdfUploadModal;