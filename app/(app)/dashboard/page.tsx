import { getLeadStats, getRecentLeads } from "@/lib/api";
import StatsCard from "@/components/StatsCard";
import {
  Users,
  UserPlus,
  Search,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
  PieChart,
  Loader2,
  TrendingUp,
  Target,
  Settings,
} from "lucide-react";
import { Lead } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeadStatusBadge from "@/components/LeadStatusBadge";
import LeadsPieChart from "@/components/LeadsPieChart";

export default async function DashboardPage() {
  let stats = {
    total: 0,
    new: 0,
    researching: 0,
    qualified: 0,
    not_qualified: 0,
    average_score: 0,
    conversion_rate: 0,
  };
  let recentLeads: Lead[] = [];

  try {
    stats = await getLeadStats();

    console.log("Fetched stats:", stats);
    recentLeads = await getRecentLeads();
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

  const qualifiedLeads = recentLeads.filter(
    (lead) => lead.status === "qualified"
  );

  const researchingLeads = recentLeads.filter(
    (lead) => lead.status === "researching"
  );

  return (
    <div className="p-6 mt-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/leads">
          <Button className="cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-5">
        {/* Total Leads card */}
        <StatsCard
          title="Total Leads"
          value={stats.total}
          icon={<Users className="w-6 h-6 text-white" />}
          bgColor="bg-blue-600 text-white"
        />

        {/* New Leads card */}
        <StatsCard
          title="New Leads"
          value={stats.new}
          icon={<UserPlus className="w-6 h-6 text-white" />}
          bgColor="bg-green-600 text-white"
        />

        {/* Researching card */}
        <StatsCard
          title="Researching"
          value={stats.researching}
          icon={<Search className="w-6 h-6 text-white" />}
          bgColor="bg-yellow-600 text-white"
        />

        {/* Qualified card */}
        <StatsCard
          title="Qualified"
          value={stats.qualified}
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          bgColor="bg-green-600 text-white"
        />

        {/* Not Qualified card */}
        <StatsCard
          title="Not Qualified"
          value={stats.not_qualified}
          icon={<XCircle className="w-6 h-6 text-white" />}
          bgColor="bg-red-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Conversion Rate */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversion_rate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Score */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{stats.average_score}/10</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-3">Quick Actions</p>
            <div className="flex gap-2">
              <Link href="/leads" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  All Leads
                </Button>
              </Link>
              <Link href="/settings" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Lead Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsPieChart stats={stats} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-yellow-600" />
              Research in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            {researchingLeads.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No research in progress
              </p>
            ) : (
              <div className="space-y-3">
                {researchingLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Researching...</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/leads">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No leads yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="block p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{lead.name}</p>
                      <LeadStatusBadge
                        status={lead.status}
                        score={lead.score}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{lead.company_name}</span>
                      <span>{lead.email}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready for Outreach</CardTitle>
          </CardHeader>
          <CardContent>
            {qualifiedLeads.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No qualified leads yet. Start researching!
              </p>
            ) : (
              <div className="space-y-3">
                {qualifiedLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">
                        {lead.score}
                      </span>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
