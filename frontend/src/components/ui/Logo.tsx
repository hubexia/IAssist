import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-primary-dark text-2xl font-black tracking-tighter normal-case",
        className,
      )}
    >
      <span className="text-primary">I</span>Assist
    </div>
  );
}

export default Logo;
