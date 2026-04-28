import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import useIsMobile from "../../hooks/useIsMobile";
import useExportToExcel from "../../hooks/useExportToExcel";
import SearchBox from "./SearchBox";

type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;

  // filters
  showSearch?: boolean;
  showStatus?: boolean;
  showDate?: boolean;

  // actions
  showAddButton?: boolean;
  showExportButton?: boolean;

  // export
  exportData?: any[];

  // config
  searchPlaceholder?: string;
  statusOptions?: Option[];
  // controlled values
  searchValue?: string;
  statusValue?: string;
  dateValue?: string;

  // events
  onSearch?: (val: string) => void;
  onStatusChange?: (val: string) => void;
  onDateChange?: (val: string) => void;

  // ✅ SIMPLE & CLEAN ADD HANDLER
  onAddClick?: () => void;

  addLabel?: string;
   showClass?: boolean;
  classOptions?: Option[];
  classValue?: string;
  onClassChange?: (val: string) => void;
};

const GlobalFilter: React.FC<Props> = ({
  showSearch = true,
  showStatus = true,
  showDate = false,
  showAddButton = false,
  showExportButton = false,

  exportData = [],
  searchPlaceholder = "Search by File Name or Heading",
  statusOptions = [{ label: "All", value: "all" }],

  searchValue = "",
  statusValue = "all",
  dateValue = "all",

  onSearch,
  onStatusChange,
  onDateChange,
  onAddClick,

  addLabel = "Add",
  showClass = false,
  classOptions = [],
  classValue = "all",
  onClassChange,
}) => {
  const isMobile = useIsMobile();
  const { exportToExcel } = useExportToExcel();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border space-y-4">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        {/* FILTERS */}
       <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

           {showSearch && onSearch && (
              <SearchBox
                value={searchValue}
                onChange={onSearch}
                placeholder={searchPlaceholder}
              />
            )}

          {showStatus && (
            <select
              value={statusValue}
              onChange={(e) => onStatusChange?.(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {showDate && (
            <select
              value={dateValue}
              onChange={(e) => onDateChange?.(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          )}
          {showClass && (
            <select
              value={classValue}
              onChange={(e) => onClassChange?.(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-md"
            >
              <option value="all">All Classes</option>
              {classOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          {showAddButton && (
            <button
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
              bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <IoMdAddCircle size={18} />
              {addLabel}
            </button>
          )}

          {showExportButton && (
            <button
              onClick={() =>
                exportToExcel(exportData, { fileName: "Export.xlsx" })
              }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
              bg-green-500 text-white rounded-md hover:bg-green-600"
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