import ClientSideBar from "./ClientSideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <ClientSideBar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
