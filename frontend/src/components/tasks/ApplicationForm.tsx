"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ITask } from "@/lib/interface/task.interface";
import FormTextarea from "../ui/FormTextarea";
import { error } from "console";

// 1. Define the Schema
const applicationSchema = z
  .object({
    priceType: z.enum(["fixed", "custom"]),
    customPrice: z
      .string()
      .optional()
      .refine((val) => {
        // If custom is selected, ensure it's a valid number > 0
        return true; // Logic handled in refined check below if needed
      }),
    message: z
      .string()
      .min(20, "Please provide a more detailed message (min 20 chars)"),
  })
  .refine(
    (data) => {
      if (data.priceType === "custom") {
        const price = parseFloat(data.customPrice || "0");
        return price > 0;
      }
      return true;
    },
    {
      message: "Please enter a valid bid amount",
      path: ["customPrice"],
    },
  );

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function ApplicationForm({
  task,
  onClose,
}: {
  task: ITask;
  onClose: () => void;
}) {
  // 2. Initialize Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      priceType: "fixed",
      customPrice: "",
      message: "",
    },
  });

  const selectedPriceType = watch("priceType");

  const onSubmit = (data: ApplicationFormValues) => {
    const finalPrice =
      data.priceType === "fixed"
        ? task.offeredPrice
        : parseFloat(data.customPrice || "0");

    console.log("Form Data:", { ...data, finalPrice });
    // Handle API call here
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A365D]">
          Submit Application
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-[#718096] hover:text-red-500 transition-colors"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Price Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-[#1A365D] uppercase tracking-wider">
            Your Price
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fixed Price Option */}
            <div
              onClick={() => setValue("priceType", "fixed")}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                selectedPriceType === "fixed"
                  ? "border-[#2B6CB0] bg-blue-50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#1A365D]">Accept Budget</span>
                {selectedPriceType === "fixed" && (
                  <Check className="w-4 h-4 text-[#2B6CB0]" />
                )}
              </div>
              <p className="text-lg font-bold text-[#2B6CB0]">
                ${task.offeredPrice}
              </p>
            </div>

            {/* Custom Price Option */}
            <div
              onClick={() => setValue("priceType", "custom")}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                selectedPriceType === "custom"
                  ? "border-[#2B6CB0] bg-blue-50"
                  : "border-gray-100"
              } ${errors.customPrice ? "border-red-300 bg-red-50" : ""}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-[#1A365D]">Custom Bid</span>
                {selectedPriceType === "custom" && (
                  <Check className="w-4 h-4 text-[#2B6CB0]" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#718096]">$</span>
                <input
                  {...register("customPrice")}
                  type="text"
                  placeholder="0.00"
                  disabled={selectedPriceType === "fixed"}
                  className="w-full bg-transparent font-bold outline-none text-[#1A365D] placeholder:text-gray-300"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
          {errors.customPrice && (
            <p className="text-xs text-red-500 font-medium ml-1">
              {errors.customPrice.message}
            </p>
          )}
        </div>

        <FormTextarea
          {...register("message")}
          rows={4}
          placeholder="Tell the client why you're a good fit..."
          label="Cover Letter / Message"
          error={errors.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 bg-primary mt-4 hover:bg-primary-dark text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Application"}
        </Button>
      </form>
    </div>
  );
}
