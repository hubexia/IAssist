import Image from "next/image";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

function AuthLayout({
  title,
  subTitle,
  className,
  children,
}: PropsWithChildren<{
  title: string;
  subTitle: string;
  className?: string;
}>) {
  return (
    <main
      className={cn(
        "flex justify-center items-center min-h-screen px-6",
        className,
      )}
    >
      <Image
        src={"/people-working.png"}
        className=" object-contain w-1/2"
        width={5000}
        height={5000}
        alt="PEeople working"
      />
      <div className=" space-y-3 p-10 sm:p-12">
        <div className="inline-flex items-center gap-3 rounded-full border border-primary bg-white/90 px-4 py-2 text-sm font-medium text-primary shadow-sm">
          Join IAssist
        </div>

        <div className="space-y-2 w-4/5">
          <h2 className="text-4xl font-semibold text-(--foreground)">
            {title}
          </h2>
          <p className="text-sm leading-7 text-(--muted)">{subTitle}</p>
        </div>
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
