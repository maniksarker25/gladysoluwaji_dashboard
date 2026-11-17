import React from 'react';

const tones = {
  brand: { chip: 'bg-brand-50 text-brand-600', glow: 'from-brand-100/70' },
  violet: { chip: 'bg-violet-50 text-violet-600', glow: 'from-violet-100/70' },
  amber: { chip: 'bg-amber-50 text-amber-600', glow: 'from-amber-100/70' },
  emerald: { chip: 'bg-emerald-50 text-emerald-600', glow: 'from-emerald-100/70' },
};

const StatisticCard = ({ icon, value, label, hint, tone = 'brand' }) => {
  const t = tones[tone] || tones.brand;
  const display = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-radial ${t.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-[28px] font-bold leading-none tracking-tight text-slate-900 tabular-nums">
            {display}
          </p>
          {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[22px] ${t.chip}`}>
          {icon}
        </span>
      </div>
    </div>
  );
};

export default StatisticCard;
