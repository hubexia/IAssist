import { PropsWithChildren } from "react";

interface IHeaderProps {
  title: string;
  toptitle?: string;
  subtiitle?: string;
}

function Header({
  title,
  toptitle,
  subtiitle,
  children,
}: PropsWithChildren<IHeaderProps>) {
  return (
    <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#718096] mb-2">
          {toptitle}
        </p>
        <h1 className="text-3xl font-bold text-primary-dark">{title}</h1>
        <p className="text-muted mt-2 text-sm">{subtiitle}</p>
      </div>
      {children}
    </header>
  );
}

export default Header;
