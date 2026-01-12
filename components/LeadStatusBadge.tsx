"use client";
import { Badge } from "./ui/badge";

type Status =
  | "new"
  | "researching"
  | "qualified"
  | "not_qualified"
  | "outreach_ready";

type Props = {
  status: Status;
  score?: number;
};

type StatusConfig = {
  label: string;
  className: string;
  variant: "secondary" | "default" | "destructive" | "outline";
};

const statusConfig: Record<Status, StatusConfig> = {
  new: {
    label: "New",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    variant: "secondary",
  },
  researching: {
    label: "Researching...",
    className: "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    variant: "outline",
  },
  qualified: {
    label: "Qualified",
    className: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-500/30",
    variant: "outline",
  },
  not_qualified: {
    label: "Not Qualified",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    variant: "destructive",
  },
  outreach_ready: {
    label: "Outreach Ready",
    className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    variant: "outline",
  },
};

const LeadStatusBadge = ({ status, score }: Props) => {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
      {status === "qualified" && score && ` (${score})`}
    </Badge>
  );
};

export default LeadStatusBadge;
