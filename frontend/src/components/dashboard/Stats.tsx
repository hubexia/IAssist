import { TrendingUp } from "lucide-react";
import React from "react";

interface IStatsProps {
  stat: { label: string; value: string; trend?: string };
}

function Stats({ stat }: IStatsProps) {
  return (
    <div
      key={stat.label}
      className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 hover:shadow-md transition-all "
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted text-sm font-medium">{stat.label}</p>
          <p className="text-4xl font-bold text-primary-dark mt-2">
            {stat.value}
          </p>
          {stat.trend && (
            <p className="text-xs text-muted mt-3 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
