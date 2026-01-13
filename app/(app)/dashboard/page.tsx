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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your lead overview.
          </p>
        </div>
        <Link href="/leads">
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer">
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
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-indigo-500 to-purple-600"
        />

        {/* New Leads card */}
        <StatsCard
          title="New Leads"
          value={stats.new}
          icon={<UserPlus className="w-5 h-5 text-white" />}
          gradient="from-blue-500 to-cyan-500"
        />

        {/* Researching card */}
        <StatsCard
          title="Researching"
          value={stats.researching}
          icon={<Search className="w-5 h-5 text-white" />}
          gradient="from-orange-500 to-yellow-500"
        />

        {/* Qualified card */}
        <StatsCard
          title="Qualified"
          value={stats.qualified}
          icon={<CheckCircle className="w-5 h-5 text-white" />}
          gradient="from-green-500 to-emerald-500"
        />

        {/* Not Qualified card */}
        <StatsCard
          title="Not Qualified"
          value={stats.not_qualified}
          icon={<XCircle className="w-5 h-5 text-white" />}
          gradient="from-red-500 to-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Conversion Rate */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversion_rate}%</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Score */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{stats.average_score}/10</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-3">Quick Actions</p>
            <div className="flex gap-2">
              <Link href="/leads" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full hover:border-indigo-500 hover:text-indigo-500"
                >
                  <Users className="w-4 h-4 mr-2" />
                  All Leads
                </Button>
              </Link>
              <Link href="/settings" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full hover:border-purple-500 hover:text-purple-500"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-500" />
              Lead Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsPieChart stats={stats} />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-orange-500" />
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
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-500">
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
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/leads">
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-500 hover:text-indigo-600"
              >
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
                    className="block p-3 border rounded-lg hover:border-indigo-500/50 hover:bg-muted/50 transition-all duration-200"
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

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Ready for Outreach
            </CardTitle>
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
                    className="flex items-center justify-between p-3 rounded-lg border border-green-500/20 hover:border-green-500/40 bg-gradient-to-r from-green-500/5 to-emerald-500/5 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-500">
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
