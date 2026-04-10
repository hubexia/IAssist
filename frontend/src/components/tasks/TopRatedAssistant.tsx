
import { Button } from "../ui/Button";

function TopRatedAssistant() {
  return (
    <div className="bg-[#2B6CB0] rounded-lg p-6 text-white shadow-sm">
      <p className="text-sm uppercase tracking-[0.25em] text-[#D5E8FF]">
        Need assistance?
      </p>
      <h3 className="mt-4 text-xl font-semibold">Hire a top-rated assistant</h3>
      <p className="mt-3 text-sm text-[#D5E8FF]">
        We recommend experienced assistants to take your task forward quickly.
      </p>
      <div className="mt-6 rounded-lg bg-white p-4 text-[#1A365D]">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Recommended match</span>
          <span className="text-[#4FD1C5]">Best fit</span>
        </div>
        <p className="mt-3 text-sm text-[#718096]">
          Sophia Lee • Conversion Specialist
        </p>
        <Button className="mt-4 w-full bg-[#4FD1C5] text-[#1A365D] hover:bg-[#3bb9ac]">
          Invite now
        </Button>
      </div>
    </div>
  );
}

export default TopRatedAssistant;
