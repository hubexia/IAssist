import AssistantSideBar from "./AdminSideBar";

export default function AssistantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AssistantSideBar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
