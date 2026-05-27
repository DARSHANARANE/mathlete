import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

import useIsMobile from "../../hooks/useIsMobile";
import useExportToExcel from "../../hooks/useExportToExcel";

import SearchBox from "./SearchBox";

// ================= TYPES =================
type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  align?: "" | "left";

  // ================= FILTERS =================
  showSearch?: boolean;
  showStatus?: boolean;
  showDate?: boolean;

  showClass?: boolean;
  showLevel?: boolean;

  // ================= ACTIONS =================
  showAddButton?: boolean;
  showExportButton?: boolean;

  // ================= EXPORT =================
  exportData?: any[];

  // ================= CONFIG =================
  searchPlaceholder?: string;

  statusOptions?: Option[];
  classOptions?: Option[];
  levelOptions?: Option[];

  hideAllClassOption?: boolean;
  hideAllLevelOption?: boolean;

  // ================= CONTROLLED VALUES =================
  searchValue?: string;
  statusValue?: string;
  classValue?: string;
  levelValue?: string;
  dateValue?: string;

  // ================= EVENTS =================
  onSearch?: (val: string) => void;
  onStatusChange?: (val: string) => void;
  onClassChange?: (val: string) => void;
  onLevelChange?: (val: string) => void;
  onDateChange?: (val: string) => void;

  // ================= ADD BUTTON =================
  onAddClick?: () => void;
  addLabel?: string;
};

const GlobalFilter: React.FC<Props> = ({
  // ================= DEFAULTS =================
  showSearch = true,
  showStatus = true,
  showDate = false,

  showClass = false,
  showLevel = false,

  showAddButton = false,
  showExportButton = false,

  exportData = [],

  searchPlaceholder = "Search by File Name or Heading",

  statusOptions = [
    {
      label: "All",
      value: "all",
    },
  ],

  classOptions = [],
  levelOptions = [],

  hideAllClassOption = false,
  hideAllLevelOption = false,

  searchValue = "",
  statusValue = "all",
  classValue = "",
  levelValue = "",
  dateValue = "all",

  onSearch,
  onStatusChange,
  onClassChange,
  onLevelChange,
  onDateChange,

  onAddClick,

  addLabel = "Add",

  align,
}) => {
  const isMobile = useIsMobile();

  const { exportToExcel } =
    useExportToExcel();

  return (
    <div
      className={`${
        align === "left"
          ? ""
          : "bg-white p-4 rounded-xl shadow-sm border space-y-4"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* ================= FILTERS ================= */}
        <div
          className={`${
            align === "left"
              ? "flex flex-wrap gap-3"
              : "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {/* SEARCH */}
          {showSearch && onSearch && (
            <SearchBox
              value={searchValue}
              onChange={onSearch}
              placeholder={searchPlaceholder}
            />
          )}

          {/* STATUS */}
          {showStatus && (
            <select
              value={statusValue}
              onChange={(e) =>
                onStatusChange?.(
                  e.target.value
                )
              }
              className={`border px-3 py-2 text-sm rounded-md ${
                align === "left"
                  ? "min-w-[100px] flex-1"
                  : "w-full"
              }`}
            >
              {statusOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* CLASS */}
          {showClass && (
            <select
              value={classValue}
              onChange={(e) =>
                onClassChange?.(
                  e.target.value
                )
              }
              className={`border px-3 py-2 text-sm rounded-md ${
                align === "left"
                  ? "min-w-[100px] flex-1"
                  : "w-full"
              }`}
            >
              {!hideAllClassOption && (
                <option value="all">
                  All Classes
                </option>
              )}

              {classOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* LEVEL */}
          {showLevel && (
            <select
              value={levelValue}
              onChange={(e) =>
                onLevelChange?.(
                  e.target.value
                )
              }
              className={`border px-3 py-2 text-sm rounded-md ${
                align === "left"
                  ? "min-w-[100px] flex-1"
                  : "w-full"
              }`}
            >
              {!hideAllLevelOption && (
                <option value="all">
                  All Levels
                </option>
              )}

              {levelOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div
          className={`flex gap-2 ${
            !showAddButton &&
            !showExportButton
              ? "hidden"
              : ""
          }`}
        >
          {/* ADD BUTTON */}
          {showAddButton && (
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <IoMdAddCircle size={18} />
              {addLabel}
            </button>
          )}

          {/* EXPORT BUTTON */}
          {showExportButton && (
            <button
              onClick={() =>
                exportToExcel(exportData, {
                  fileName: "Export.xlsx",
                })
              }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <FiDownload size={18} />
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalFilter;