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
    className: "bg-gray-100 text-gray-800",
    variant: "secondary",
  },
  researching: {
    label: "Researching...",
    className: "bg-blue-100 text-blue-800",
    variant: "default",
  },
  qualified: {
    label: "Qualified",
    className: "bg-green-100 text-green-800",
    variant: "default",
  },
  not_qualified: {
    label: "Not Qualified",
    className: "bg-red-100 text-red-800",
    variant: "destructive",
  },
  outreach_ready: {
    label: "Outreach Ready",
    className: "bg-yellow-100 text-yellow-800",
    variant: "outline",
  },
};

const LeadStatusBdge = ({ status, score }: Props) => {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
      {status === "qualified" && score && ` (${score})`}
    </Badge>
  );
};

export default LeadStatusBdge;
