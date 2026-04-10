import { Search } from "lucide-react";
import React from "react";

function SearchBar({ placeholder }: { placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
      <input
        type="text"
        placeholder={placeholder || "Search"}
        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2B6CB0]/10 w-64"
      />
    </div>
  );
}

export default SearchBar;
