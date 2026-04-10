import { clsx, type ClassValue } from "clsx"
// import { CANCELLED } from "dns";
import { twMerge } from "tailwind-merge"
import { OPEN, IN_PROGRESS, COMPLETED, CANCELLED } from "./constants";
import { AlertCircle, PlayCircle, CheckCircle, XCircle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const getStatusIcon = (status: string) => {
//     switch (status) {
//       case OPEN:
//         return <AlertCircle className="w-5 h-5 text-yellow-500" />;
//       case IN_PROGRESS:
//         return <PlayCircle className="w-5 h-5 text-blue-500" />;
//       case COMPLETED:
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case CANCELLED:
//         return <XCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <AlertCircle className="w-5 h-5 text-gray-500" />;
//     }
//   };

export const getStatusColor = (status: string) => {
    switch (status) {
      case OPEN:
        return "bg-yellow-100 text-yellow-800";
      case IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case COMPLETED:
        return "bg-green-100 text-green-800";
      case CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };