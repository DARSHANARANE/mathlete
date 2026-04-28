import React, { useState } from "react";
import BaseModal from "./BaseModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (
    file: File | null,
    year: string,
    className: string,
    heading: string
  ) => void;
};

const ResultUploadModal: React.FC<Props> = ({
  open,
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState("2024-25");
  const [className, setClassName] = useState("1");
  const [heading, setHeading] = useState("");

  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title="Upload Result File"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>

          <button
            onClick={() => onUpload(file, year, className, heading)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Upload
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Upload Excel</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>


        <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full border p-2 rounded">
          {[...Array(10)].map((_, i) => (
            <option key={i} value={`${i + 1}`}>
              Class {i + 1}
            </option>
          ))}
        </select>

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Heading (optional)"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    </BaseModal>
  );
};

export default ResultUploadModal;