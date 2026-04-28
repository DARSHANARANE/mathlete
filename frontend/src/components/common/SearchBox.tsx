import React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

const SearchBox: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <FiSearch className="absolute left-3 top-2.5 text-gray-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md"
      />
    </div>
  );
};

export default SearchBox;