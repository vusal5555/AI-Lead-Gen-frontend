"use client";

import { Lead, Report } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { startResearch } from "@/lib/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import LeadStatusBadge from "./LeadStatusBadge";

type Props = {
  lead: Lead;
  reports: { reports: Report[] };
};

const LeadDetails = ({ lead, reports }: Props) => {
  const [status, setStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  const hadnleResearch = async () => {
    try {
      setLoading(true);
      setStatus("researching");

      await startResearch(lead.id);

      window.location.reload();
    } catch (error) {
      console.error("Failed to start research:", error);
      setStatus(lead.status); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Back button */}
      <Link href="/leads">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Leads
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <LeadStatusBadge status={status} score={lead.score} />
        </div>
        <p className="text-gray-600">{lead.company_name}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Contact Info</h2>
        <p>Email: {lead.email}</p>
        <p>Website: {lead.company_website || "N/A"}</p>
        <p>LinkedIn: {lead.linkedin_url || "N/A"}</p>
      </div>

      {/* Score */}
      {status === "qualified" && lead.score && (
        <div className="mb-6 p-4 border rounded-lg bg-green-50">
          <h2 className="font-semibold">Lead Score</h2>
          <p className="text-3xl font-bold text-green-600">{lead.score}/10</p>
        </div>
      )}

      {/* Start Research Button */}
      {status === "new" && (
        <Button
          onClick={hadnleResearch}
          disabled={loading}
          className="mb-6 cursor-pointer"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {loading ? "Researching..." : "Start Research"}
        </Button>
      )}

      {/* Researching Status */}
      {status === "researching" && (
        <div className="mb-6 p-4 border rounded-lg bg-blue-50">
          <p className="text-blue-600">
            <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            Research in progress...
          </p>
        </div>
      )}

      {/* Reports */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Reports</h2>

        {reports.reports.length === 0 ? (
          <p className="text-gray-500">
            No reports yet. Start research to generate reports.
          </p>
        ) : (
          <div className="space-y-4">
            {reports.reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {report.report_type}
                </p>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {report.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetails;
