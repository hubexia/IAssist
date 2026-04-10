import { Star, Users } from "lucide-react";

const topAssistants = [
  {
    id: 1,
    name: "Phoenix Writers",
    rating: 4.9,
    reviews: 128,
    status: "Available",
  },
  {
    id: 2,
    name: "Cohan Morri",
    rating: 4.8,
    reviews: 95,
    status: "Available",
  },
];

function Assistants() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-primary-dark mb-4">
        Top Assistants
      </h3>
      <div className="space-y-4">
        {topAssistants.map((assistant) => (
          <div
            key={assistant.id}
            className="flex items-center gap-3 p-3 hover:bg-[#F7FAFC] rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-dark">
                {assistant.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(assistant.rating)
                          ? "fill-secondary text-secondary"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted">
                  ({assistant.reviews})
                </span>
              </div>
            </div>
            <span className="text-xs bg-secondary bg-opacity-20 text-white px-2 py-1 rounded">
              {assistant.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assistants;
