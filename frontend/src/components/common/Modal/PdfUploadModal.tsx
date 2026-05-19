import React, { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { getUploadYearOptions } from "../../../constants/yearOptions";
type PdfFormData = {
  file?: File | null;
  title: string;
  className: string;
  level?: string;
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
   className: "1",
    year: "2026-27",
    level: "Level 1",
    price: "",
  });

  const isEdit = !!initialData;
  const yearOptions = getUploadYearOptions();
  // ======================
  // Prefill for edit
  // ======================
  useEffect(() => {
    if (initialData) {
      setForm({
        file: null,
        title: initialData.title || "",
        className: initialData.className || "",
        level: initialData.level ? String(initialData.level) : "",
        year: initialData.year || "",
        price: String(initialData.price || ""),
      });
    } else {
      setForm({
        file: null,
        title: "",
        className: "1",
        year: "2026-27",
        level: "Level 1",
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
     <select
  value={form.className}
  onChange={(e) =>
    handleChange("className", e.target.value)
  }
  className="w-full border p-2 rounded"
>
  {[...Array(7)].map((_, i) => (
    <option
      key={i}
      value={`${i + 1}`}
    >
      Class {i + 1}
    </option>
  ))}
</select>

        {/* YEAR */}
   <select
  className="w-full border p-2 rounded"
  value={form.year}
  disabled={isEdit}
  onChange={(e) =>
    handleChange("year", e.target.value)
  }
>
  {yearOptions.map((option) => (
    <option
      key={option.value}
      value={option.value}
    >
      {option.label}
    </option>
  ))}
</select>
        {/* LEVEL */}
    <select
  value={form.level}
  onChange={(e) =>
    handleChange("level", e.target.value)
  }
  className="w-full border p-2 rounded"
>
  <option value="Level 1">
    Level 1
  </option>

  <option value="Level 2">
    Level 2
  </option>
</select>
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