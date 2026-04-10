import React from "react";

interface FormInputProps {
  label: string;
  errorMessage?: string;
}

function FormInput({
  label,
  type,
  errorMessage,
  ...props
}: React.ComponentProps<"input"> & FormInputProps) {
  return (
    <label className="space-y-1 block">
      <p className="text-sm font-medium text-primary-dark">{label}</p>
      <input
        type={type}
        className={`w-full rounded-lg border bg-[#F7FAFC] px-3 py-3 text-sm text-[#1A365D] outline-none focus:border-[#2B6CB0] focus:ring-2 focus:ring-[#2B6CB0]/20 ${
          errorMessage ? "border-red-500" : "border-gray-200"
        }`}
        {...props}
      />
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </label>
  );
}

export default FormInput;
