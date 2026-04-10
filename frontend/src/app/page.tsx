import { Button } from "@/components/ui/Button";
import NavBar from "@/components/ui/NavBar";
import { Zap, CheckCircle, Clock, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-white text-primary-dark font-sans">
        <section className="relative pt-20 pb-24 overflow-hidden border-b border-gray-50">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-150 h-150 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2B6CB0] px-3 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide">
                <Zap className="w-3.5 h-3.5" /> Delegate. Scale. Succeed.
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-6 tracking-tighter">
                Meet <span className="text-[#2B6CB0]">IAssist</span>: The Smart
                Connection Hub for Task Management.
              </h1>

              <p className="text-lg text-[#718096] mb-9 max-w-xl leading-relaxed font-medium">
                Bridge the gap between your tasks and elite assistants. Track
                proposals, secure payments, and manage deliverables—all in one
                place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#1A365D] hover:bg-[#2B6CB0] text-white px-8 py-7 rounded-2xl text-lg font-bold shadow-lg shadow-blue-900/10 transition-all">
                  Join as Client
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-[#1A365D] hover:bg-auto hover:text-primary-dark px-8 py-7 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all"
                >
                  Become an Assistant
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-[#718096]">Join today</p>
              </div>
            </div>

            {/* Right Side: Hero Image */}
            <div className="relative animate-in fade-in zoom-in duration-1000">
              <div className="relative z-10 rounded-4xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/hero-worker.png" // Ensure your image is saved with this name in the /public folder
                  alt="IAssist Professional Working"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20 border border-gray-100 hidden md:flex items-center gap-4 animate-bounce-slow">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#A0AEC0] uppercase">
                    Success Rate
                  </p>
                  <p className="text-lg font-bold text-[#1A365D]">
                    99.2% Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 tracking-tight">
                Built for Seamless Workflow
              </h2>
              <p className="text-[#718096] font-medium leading-relaxed">
                Simple, transparent, and designed for efficient delegation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Secure Escrow",
                  desc: "Funds held securely until deliverables are approved.",
                  icon: <CheckCircle className="w-6 h-6" />,
                },
                {
                  title: "Transparent Bidding",
                  desc: "Clients post budget; assistants propose or accept prices.",
                  icon: <Target className="w-6 h-6" />,
                },
                {
                  title: "Status Tracking",
                  desc: "Real-time updates on applications and milestones.",
                  icon: <Clock className="w-6 h-6" />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-50 text-[#2B6CB0] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2B6CB0] group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2.5 text-[#1A365D] tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#718096] leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[#718096] text-xs font-bold uppercase tracking-widest">
          <div className="text-[#1A365D] text-2xl font-black tracking-tighter normal-case">
            <span className="text-[#2B6CB0]">I</span>Assist
          </div>

          <p>© 2026 IAssist Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
