"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

type Props = {
  stats: {
    new: number;
    researching: number;
    qualified: number;
    not_qualified: number;
  };
};

const COLORS = {
  new: "#64748b",
  researching: "#6366f1",
  qualified: "#22c55e",
  not_qualified: "#ef4444",
};

export default function LeadsPieChart({ stats }: Props) {
  const data = [
    { name: "New", value: stats.new, color: COLORS.new },
    {
      name: "Researching",
      value: stats.researching,
      color: COLORS.researching,
    },
    { name: "Qualified", value: stats.qualified, color: COLORS.qualified },
    {
      name: "Not Qualified",
      value: stats.not_qualified,
      color: COLORS.not_qualified,
    },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No leads yet. Add your first lead!
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            color: "#ffffff",
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          itemStyle={{
            color: "#ffffff",
          }}
          labelStyle={{
            color: "#ffffff",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
