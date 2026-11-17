import React from "react";

const StatusDonutChart = ({ totalRequests = 0, completed = 0, canceled = 0 }) => {
  const data = [
    { label: "Requests", value: totalRequests, color: "#7CC4DC" },
    { label: "Completed", value: completed, color: "#006C93" },
    { label: "Canceled", value: canceled, color: "#F59E9E" },
  ];

  const sum = data.reduce((s, d) => s + d.value, 0);
  const total = sum || 1;
  const completionRate = totalRequests > 0 ? Math.round((completed / totalRequests) * 100) : 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const gap = sum > 0 && data.filter((d) => d.value > 0).length > 1 ? 1.5 : 0;
  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-52 w-52">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="11" />
          {data.map((item) => {
            const slice = (item.value / total) * circumference;
            const visible = Math.max(slice - gap, 0);
            const el = (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="11"
                strokeDasharray={`${visible} ${circumference - visible}`}
                strokeDashoffset={-offset}
                className="transition-all duration-700 ease-out"
              />
            );
            offset += slice;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">{completionRate}%</span>
          <span className="text-xs font-medium text-slate-500">Completion rate</span>
        </div>
      </div>

      <div className="mt-6 w-full space-y-2">
        {data.map((item) => {
          const pct = sum > 0 ? Math.round((item.value / sum) * 100) : 0;
          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm"
            >
              <span className="flex items-center gap-2.5 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 tabular-nums">{item.value.toLocaleString()}</span>
                <span className="w-10 text-right text-xs text-slate-400 tabular-nums">{pct}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusDonutChart;
