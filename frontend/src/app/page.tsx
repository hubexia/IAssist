import NavBar from "@/components/ui/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-(--surface) to-[rgba(79,209,197,0.16)] py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-(--foreground) mb-6">
              Welcome to <span className="text-primary">IAssist</span>
            </h1>
            <p className="text-xl text-(--muted) mb-8 max-w-3xl mx-auto">
              Your dynamic marketplace designed to connect individuals and
              businesses (Clients) with skilled professionals (Assistants) ready
              to get the job done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary text-white cursor-pointer rounded-lg font-semibold px-8 py-3 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
