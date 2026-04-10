import { cn } from "@/lib/utils";
import React from "react";

function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-primary font-bold text-2xl tracking-widest",
        { "text-white": dark },
        className,
      )}
    >
      IASSIST
    </p>
  );
}

export default Logo;
