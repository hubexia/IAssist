import React from "react";
import { FieldError } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  error?: FieldError;
  helperText?: string;
}

function FormTextarea({
  label,
  error,
  helperText,
  ...props
}: React.ComponentProps<"textarea"> & FormTextareaProps) {
  return (
    <label >
      <span className="text-sm font-medium text-[#1A365D]">{label}</span>
      <textarea
        className={`w-full rounded-lg border bg-[#F7FAFC] px-3 py-3 text-sm text-[#1A365D] outline-none focus:border-[#2B6CB0] focus:ring-2 focus:ring-[#2B6CB0]/20 ${
          error ? "border-red-500" : "border-gray-200"
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
      {helperText && !error && (
        <span className="text-xs text-[#718096]">{helperText}</span>
      )}
    </label>
  );
}

export default FormTextarea;
