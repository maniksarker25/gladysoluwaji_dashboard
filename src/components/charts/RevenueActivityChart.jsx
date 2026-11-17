import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { fontFamily } from '../../theme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const compact = (value) => {
  if (value >= 1_000_000) return `${+(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1000) return `${+(value / 1000).toFixed(1)}K`;
  return value;
};

const RevenueActivityChart = ({ monthlyData = [] }) => {
  const chartValues = useMemo(
    () => (monthlyData.length === 12 ? monthlyData.map((v) => Number(v) || 0) : Array(12).fill(0)),
    [monthlyData]
  );

  const data = useMemo(
    () => ({
      labels: MONTHS,
      datasets: [
        {
          fill: true,
          label: 'Revenue',
          data: chartValues,
          borderWidth: 3,
          borderColor: '#006C93',
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return undefined;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(0, 108, 147, 0.22)');
            gradient.addColorStop(1, 'rgba(0, 108, 147, 0)');
            return gradient;
          },
          tension: 0.42,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#006C93',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
        },
      ],
    }),
    [chartValues]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      layout: { padding: { top: 8 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0B1B2B',
          titleColor: '#94A3B8',
          bodyColor: '#fff',
          titleFont: { family: fontFamily, size: 11, weight: '500' },
          bodyFont: { family: fontFamily, size: 13, weight: '700' },
          padding: 12,
          cornerRadius: 10,
          displayColors: false,
          callbacks: {
            label: (ctx) => `₦${(ctx.parsed.y ?? 0).toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { family: fontFamily, size: 11 }, color: '#94A3B8' },
        },
        y: {
          beginAtZero: true,
          grace: '10%',
          border: { display: false, dash: [4, 4] },
          grid: { color: '#EEF2F6', drawTicks: false },
          ticks: {
            padding: 10,
            maxTicksLimit: 6,
            callback: (value) => `₦${compact(value)}`,
            font: { family: fontFamily, size: 11 },
            color: '#94A3B8',
          },
        },
      },
    }),
    []
  );

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueActivityChart;
