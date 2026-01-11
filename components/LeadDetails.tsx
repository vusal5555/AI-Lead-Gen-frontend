"use client";

import { Lead, Report } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  useState,
  useMemo,
  memo,
  useCallback,
  startTransition,
  lazy,
  Suspense,
} from "react";
import { startResearch } from "@/lib/api";
import {
  ArrowLeft,
  Loader2,
  Mail,
  Globe,
  Linkedin,
  FileText,
  Building,
  Newspaper,
  Share2,
  MessageSquare,
} from "lucide-react";
import LeadStatusBadge from "./LeadStatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Lazy load the heavy MarkdownContent component
const MarkdownContent = lazy(() =>
  import("./MarkDown").then((mod) => ({ default: mod.MarkdownContent }))
);

type Props = {
  lead: Lead;
  reports: { reports: Report[] };
};

// Map report types to icons
const reportIcons: Record<string, React.ReactNode> = {
  "LinkedIn Summary": <Linkedin className="w-4 h-4" />,
  website_analysis: <Globe className="w-4 h-4" />,
  blog_analysis: <FileText className="w-4 h-4" />,
  digital_presence_report: <Globe className="w-4 h-4" />,
  global_research: <Building className="w-4 h-4" />,
  outreach_report: <Mail className="w-4 h-4" />,
  social_media_analysis: <Share2 className="w-4 h-4" />,
  news_analysis: <Newspaper className="w-4 h-4" />,
  interview_script: <MessageSquare className="w-4 h-4" />,
};

// Lightweight loading placeholder
const MarkdownSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-muted rounded w-3/4" />
    <div className="h-4 bg-muted rounded w-full" />
    <div className="h-4 bg-muted rounded w-5/6" />
  </div>
);

// Memoized report item with lazy markdown loading
const ReportItem = memo(function ReportItem({
  report,
  isVisible,
}: {
  report: Report;
  isVisible: boolean;
}) {
  return (
    <div className="p-4 bg-muted/30 rounded-lg">
      <h4 className="font-medium mb-2">{report.title}</h4>
      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
        {isVisible ? (
          <Suspense fallback={<MarkdownSkeleton />}>
            <MarkdownContent content={report.content} />
          </Suspense>
        ) : (
          <MarkdownSkeleton />
        )}
      </div>
    </div>
  );
});

export default function LeadDetails({ lead, reports }: Props) {
  const [status, setStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Track which sections have been opened (for lazy loading)
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());

  // Group reports by type
  const groupedReports = useMemo(() => {
    const groups: Record<string, Report[]> = {};

    reports.reports.forEach((report) => {
      const type = report.report_type || "Other";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(report);
    });

    return Object.entries(groups);
  }, [reports.reports]);

  // Handle accordion state changes with startTransition for smooth UI
  const handleAccordionChange = useCallback((value: string[]) => {
    // Immediately update the accordion open/close state
    setOpenItems(value);

    // Use startTransition for the heavy markdown rendering
    startTransition(() => {
      setLoadedSections((prev) => {
        const next = new Set(prev);
        value.forEach((v) => next.add(v));
        return next;
      });
    });
  }, []);

  const handleResearch = async () => {
    try {
      setLoading(true);
      setStatus("researching");
      await startResearch(lead.id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to start research:", error);
      setStatus(lead.status);
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

      {/* Header Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <CardTitle className="text-2xl">{lead.name}</CardTitle>
                <LeadStatusBadge status={status} score={lead.score} />
              </div>
              <p className="text-muted-foreground">{lead.company_name}</p>
            </div>

            {/* Score Badge */}
            {status === "qualified" && lead.score && (
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {lead.score}
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a
                href={`mailto:${lead.email}`}
                className="text-blue-600 hover:underline"
              >
                {lead.email}
              </a>
            </div>

            {lead.company_website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Link
                  href={lead.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Website
                </Link>
              </div>
            )}

            {lead.linkedin_url && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                <Link
                  href={lead.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </Link>
              </div>
            )}
          </div>

          {/* Start Research Button */}
          {status === "new" && (
            <Button
              onClick={handleResearch}
              disabled={loading}
              className="mt-4"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Researching..." : "Start Research"}
            </Button>
          )}

          {/* Researching Status */}
          {status === "researching" && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Research in progress...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reports Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Reports ({reports.reports.length})
        </h2>

        {reports.reports.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reports yet. Start research to generate reports.
            </CardContent>
          </Card>
        ) : (
          <Accordion
            type="multiple"
            className="space-y-2"
            value={openItems}
            onValueChange={handleAccordionChange}
          >
            {groupedReports.map(([type, typeReports]) => (
              <AccordionItem
                key={type}
                value={type}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    {reportIcons[type] || <FileText className="w-4 h-4" />}
                    <span className="font-medium">{type}</span>
                    <span className="text-muted-foreground text-sm">
                      ({typeReports.length})
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {typeReports.map((report) => (
                      <ReportItem
                        key={report.id}
                        report={report}
                        isVisible={loadedSections.has(type)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
