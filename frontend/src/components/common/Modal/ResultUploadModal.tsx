import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { getUploadYearOptions } from "../../../constants/yearOptions";

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

  const [year, setYear] = useState("");

  const [className, setClassName] = useState("1");

  const [heading, setHeading] = useState("");

  const yearOptions = getUploadYearOptions();

  return (
    <BaseModal
      isOpen={open}
      onClose={onClose}
      title="Upload Result File"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onUpload(
                file,
                year,
                className,
                heading
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Upload
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* FILE */}
        <div>
          <label className="block text-sm mb-1">
            Upload Excel
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        {/* YEAR */}
        <div>
          <label className="block text-sm mb-1">
            Select Year
          </label>

          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            className="w-full border p-2 rounded"
          >
            <option value="">
              Select Year
            </option>

            {yearOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* CLASS */}
        <div>
          <label className="block text-sm mb-1">
            Select Class
          </label>

          <select
            value={className}
            onChange={(e) =>
              setClassName(e.target.value)
            }
            className="w-full border p-2 rounded"
          >
            {[...Array(10)].map((_, i) => (
              <option
                key={i}
                value={`${i + 1}`}
              >
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* HEADING */}
        <div>
          <label className="block text-sm mb-1">
            Heading
          </label>

          <input
            placeholder="Heading (optional)"
            value={heading}
            onChange={(e) =>
              setHeading(e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default ResultUploadModal;