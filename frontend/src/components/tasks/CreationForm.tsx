"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import { taskSchema, type TaskFormData } from "@/lib/schemas/task.schema";
import { CheckCircle2 } from "lucide-react";

function CreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      budget: "",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Form submitted with validated data:", data);
    // TODO: Send data to backend API
  };
  return (
    <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#1A365D] font-semibold text-lg">Task details</p>
            <p className="text-[#718096] text-sm">
              Add the main information your assistant needs.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full text-white bg-[#4FD1C5] bg-opacity-15 px-3 py-1 text-sm font-medium ">
            <CheckCircle2 className="w-4 h-4 " /> Recommended
          </span>
        </div>

        <FormInput
          label="Task title"
          type="text"
          placeholder="E.g. Improve landing page conversion"
          {...register("title")}
          errorMessage={errors.title?.message}
        />

        <FormTextarea
          label="Description"
          placeholder="Describe the task, goals, deliverables, and any important notes..."
          rows={6}
          error={errors.description}
          {...register("description")}
        />
        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            label="Deadline"
            type="date"
            errorMessage={errors.deadline?.message}
            {...register("deadline")}
          />
          <FormInput
            label="Budget"
            type="text"
            placeholder="Enter budget amount"
            errorMessage={errors.budget?.message}
            {...register("budget")}
          />
        </div>

        <div className="rounded-lg border border-gray-200 bg-[#F7FAFC] p-4">
          <p className="text-sm font-medium text-[#1A365D] mb-3">
            Suggested briefing
          </p>
          <ul className="space-y-2 text-sm text-[#718096]">
            <li>• Define the goal and expected outcome.</li>
            <li>• Include a realistic deadline.</li>
            <li>• Attach examples or reference materials.</li>
          </ul>
        </div>
        {/* <div className="rounded-lg border border-gray-200 bg-[#F7FAFC] p-4">
            <p className="text-sm font-medium text-[#1A365D] mb-3">
              Need help?
            </p>
            <p className="text-sm text-[#718096]">
              Use our task wizard to match the right assistant faster and reduce
              revisions.
            </p>
          </div> */}

        <Button
          type="submit"
          className="bg-primary mt-4 text-white block  w-fit ml-auto hover:bg-primary-dark px-6 py-3 rounded-lg text-sm"
        >
          Publish Task
        </Button>
      </form>
    </section>
  );
}

export default CreationForm;
