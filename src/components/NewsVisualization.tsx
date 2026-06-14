/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, TrendingUp, Sparkles } from "lucide-react";
import { VisualizationData } from "../types";

interface Props {
  visualization: VisualizationData;
}

export default function NewsVisualization({ visualization }: Props) {
  const { type, title, description, data } = visualization;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  // Render Line Chart
  const renderLineChart = () => {
    const width = 500;
    const height = 180;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = height - padding - (d.value / maxValue) * chartHeight;
      return { x, y, label: d.label, value: d.value };
    });

    const pathD = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");

    const areaD = points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : "";

    return (
      <div className="relative w-full" id="viz-line-chart">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * chartHeight;
            const valueLabel = Math.round(maxValue * (1 - ratio));
            return (
              <g key={idx}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  className="stroke-gray-200 dark:stroke-slate-800"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-gray-400 dark:fill-slate-500 font-mono text-[10px]"
                >
                  {valueLabel}
                </text>
              </g>
            );
          })}

          {/* Spark area */}
          <motion.path
            d={areaD}
            className="fill-amber-500/10 dark:fill-amber-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Spark line path */}
          <motion.path
            d={pathD}
            fill="none"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Interaction circles & Verticals */}
          {points.map((p, i) => (
            <g
              key={i}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Vertical guideline */}
              {hoveredIdx === i && (
                <line
                  x1={p.x}
                  y1={padding}
                  x2={p.x}
                  y2={height - padding}
                  className="stroke-amber-500/30 dark:stroke-amber-400/30"
                  strokeWidth="1.5"
                />
              )}

              {/* Ticks/Labels */}
              <text
                x={p.x}
                y={height - padding + 18}
                textAnchor="middle"
                className="fill-gray-500 dark:fill-slate-400 font-medium text-[11px]"
              >
                {p.label}
              </text>

              {/* Primary point circles */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === i ? 6 : 4}
                className="fill-amber-500 dark:fill-amber-400 stroke-white dark:stroke-slate-900"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            </g>
          ))}
        </svg>

        {/* Hover Popover */}
        <div className="h-6 mt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {hoveredIdx !== null ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="px-3 py-1 rounded bg-amber-500 dark:bg-amber-400 text-white dark:text-slate-950 font-mono text-xs font-semibold flex items-center gap-1.5"
              >
                <span>{data[hoveredIdx].label}:</span>
                <span className="font-bold">{data[hoveredIdx].value.toLocaleString()}</span>
              </motion.div>
            ) : (
              <p className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                <Info size={12} /> Hover data points to inspect indicators
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  // Render Bar Chart
  const renderBarChart = () => {
    return (
      <div className="space-y-3.5 pr-2" id="viz-bar-chart">
        {data.map((item, i) => {
          const ratio = (item.value / maxValue) * 100;
          const isHovered = hoveredIdx === i;

          return (
            <div
              key={i}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-700 dark:text-slate-300 font-medium group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {item.label}
                </span>
                <span className="font-mono text-gray-500 dark:text-slate-400 font-semibold">
                  {item.value.toLocaleString()}
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ratio}%` }}
                  transition={{ type: "spring", stiffness: 85, damping: 14, delay: i * 0.07 }}
                  style={{
                    filter: isHovered ? "brightness(1.15)" : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Donut Chart
  const renderDonutChart = () => {
    const size = 180;
    const center = size / 2;
    const strokeWidth = 14;
    const radius = center - strokeWidth - 10;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercentage = 0;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6" id="viz-donut-chart">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              className="stroke-gray-100 dark:stroke-slate-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Segment calculation */}
            {data.map((item, i) => {
              const share = item.value / totalValue;
              const strokeLength = share * circumference;
              const strokeOffset = circumference - (accumulatedPercentage * circumference);
              accumulatedPercentage += share;

              const isHovered = hoveredIdx === i;

              // Color tints
              const colors = [
                "stroke-amber-500 dark:stroke-amber-400",
                "stroke-slate-500 dark:stroke-slate-400",
                "stroke-gray-400 dark:stroke-slate-600",
                "stroke-amber-300 dark:stroke-amber-600",
                "stroke-neutral-300 dark:stroke-neutral-700"
              ];
              const colorClass = colors[i % colors.length];

              return (
                <motion.circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius}
                  className={`${colorClass} cursor-pointer`}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              );
            })}
          </svg>

          {/* Centered label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono tracking-wider uppercase">
              {hoveredIdx !== null ? data[hoveredIdx].label : "Total Index"}
            </span>
            <span className="text-xl font-bold font-sans text-gray-800 dark:text-white">
              {hoveredIdx !== null
                ? `${Math.round((data[hoveredIdx].value / totalValue) * 100)}%`
                : totalValue.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 flex-1 max-w-[200px]">
          {data.map((item, i) => {
            const share = Math.round((item.value / totalValue) * 100);
            const isHovered = hoveredIdx === i;

            const bgColors = [
              "bg-amber-500 dark:bg-amber-400",
              "bg-slate-500 dark:bg-slate-400",
              "bg-gray-400 dark:bg-slate-600",
              "bg-amber-300 dark:bg-amber-600",
              "bg-neutral-300/80 dark:bg-neutral-700"
            ];
            const dotColor = bgColors[i % bgColors.length];

            return (
              <div
                key={i}
                className={`flex items-center gap-2 p-1.5 rounded transition-all cursor-pointer ${
                  isHovered ? "bg-gray-50 dark:bg-slate-800/50 pl-3" : ""
                }`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs truncate font-medium text-gray-700 dark:text-slate-300">
                    {item.label}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-gray-500 dark:text-slate-400">
                    {share}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Radar Chart
  const renderRadarChart = () => {
    const size = 200;
    const center = size / 2;
    const r = 70;
    const maxVal = 100; // standard base scale

    const numPoints = data.length;
    const angleStep = (2 * Math.PI) / numPoints;

    // Grid web concentric rings
    const grids = [0.25, 0.5, 0.75, 1];

    const getCoord = (angle: number, value: number) => {
      const x = center + (value / maxVal) * r * Math.sin(angle);
      const y = center - (value / maxVal) * r * Math.cos(angle);
      return { x, y };
    };

    // Calculate actual mapping coordinates
    const polygonPoints = data.map((d, i) => {
      const angle = i * angleStep;
      const normalizedValue = Math.min((d.value / maxValue) * 90, 100); // map to base max scale
      return getCoord(angle, normalizedValue);
    });

    const polygonD = polygonPoints.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "") + " Z";

    return (
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6" id="viz-radar-chart">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-[180px] h-[180px] overflow-visible">
          {/* Circular/Polygonal Grid webs */}
          {grids.map((g, idx) => {
            const gridPoints = Array.from({ length: numPoints }).map((_, i) => {
              return getCoord(i * angleStep, g * maxVal);
            });
            const gridD = gridPoints.reduce((acc, p, i) => {
              return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
            }, "") + " Z";

            return (
              <path
                key={idx}
                d={gridD}
                fill="none"
                className="stroke-gray-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Web Axes Lines */}
          {Array.from({ length: numPoints }).map((_, i) => {
            const end = getCoord(i * angleStep, maxVal);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                className="stroke-gray-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Value Area */}
          <motion.path
            d={polygonD}
            className="fill-amber-500/20 dark:fill-amber-400/20 stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: "90px 90px" }}
          />

          {/* Polygon Vertices */}
          {data.map((item, i) => {
            const p = polygonPoints[i];
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : 3.5}
                  className="fill-amber-500 dark:fill-amber-400 stroke-white dark:stroke-slate-900"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Labels & values legend */}
        <div className="flex-1 space-y-1.5 max-w-[200px]">
          {data.map((item, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                className={`flex justify-between items-center text-xs p-1 rounded transition-colors ${
                  isHovered ? "bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400" : "text-gray-600 dark:text-slate-400"
                }`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="truncate max-w-[120px] text-left font-medium">{item.label}</span>
                <span className="font-mono font-bold font-semibold">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Gauge speedometer Chart
  const renderGaugeChart = () => {
    // Normalizing first value relative to Max
    const targetValue = data[0]?.value || 0;
    const label = data[0]?.label || "Index";
    const percentage = Math.min((targetValue / maxValue) * 100, 100);
    const needleAngle = -90 + (percentage / 100) * 180;

    return (
      <div className="flex flex-col items-center justify-center p-2" id="viz-gauge-chart">
        <div className="relative w-48 h-28 overflow-hidden flex items-end justify-center">
          {/* Gauge semi-circle ring */}
          <svg className="absolute top-0 w-44 h-44 overflow-visible">
            {/* Background Arch */}
            <path
              d="M 12 88 A 76 76 0 0 1 164 88"
              fill="none"
              className="stroke-gray-100 dark:stroke-slate-800"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Active Colored Arch */}
            <motion.path
              d="M 12 88 A 76 76 0 0 1 164 88"
              fill="none"
              className="stroke-amber-500 dark:stroke-amber-400"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 238} 238`}
              initial={{ strokeDasharray: "0 238" }}
              animate={{ strokeDasharray: `${(percentage / 100) * 238} 238` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* Needle Pin and Pointer */}
          <div className="absolute bottom-0 w-full flex items-center justify-center">
            <motion.div
              className="relative w-1.5 h-16 origin-bottom transform cursor-pointer"
              style={{ bottom: "2px" }}
              animate={{ rotate: needleAngle }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              {/* Pointing needle line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-slate-700 dark:bg-white rounded-t-full shadow-lg" />
              {/* Gold cap needle hub */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 dark:bg-amber-400 border border-white dark:border-slate-900" />
            </motion.div>
          </div>
        </div>

        {/* Info Label Panel */}
        <div className="text-center mt-3 z-10">
          <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-mono font-medium block">
            {label} Core Performance
          </span>
          <span className="text-2xl font-black font-mono text-gray-800 dark:text-white block mt-0.5">
            {targetValue.toLocaleString()}
          </span>
          <p className="text-xs text-gray-400 dark:text-slate-400 italic max-w-sm mx-auto mt-1 px-4">
            {description}
          </p>
        </div>
      </div>
    );
  };

  const getVisualizationComponent = () => {
    switch (type) {
      case "line":
        return renderLineChart();
      case "bar":
        return renderBarChart();
      case "donut":
        return renderDonutChart();
      case "radar":
        return renderRadarChart();
      case "gauge":
        return renderGaugeChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 p-5 mt-8 shadow-sm transition-all hover:shadow-md animate-fade-in">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-800/80">
        <div className="space-y-0.5 text-left">
          <span className="text-[11px] font-mono font-bold tracking-wider text-amber-500 dark:text-amber-400 inline-flex items-center gap-1 uppercase">
            <TrendingUp size={12} /> Active Analytics
          </span>
          <h4 className="text-sm font-semibold font-sans text-gray-800 dark:text-slate-100">
            {title}
          </h4>
        </div>
        <div className="p-1.5 bg-amber-500/5 dark:bg-amber-400/5 rounded-lg border border-amber-500/10 text-amber-600 dark:text-amber-400 self-start">
          <Sparkles size={14} className="animate-pulse" />
        </div>
      </div>

      <div className="py-2">{getVisualizationComponent()}</div>
    </div>
  );
}
