"use client";

import React from "react";
import LeadsTable from "../LeadsTable";
import { Lead } from "@/types";
import AddModal from "../AddModal";
import { deleteLead } from "@/lib/api";
import { toast } from "sonner";

type Props = {
  leadsData: Lead[];
};

const LeadsClient = (props: Props) => {
  const [leads, setLeads] = React.useState<Lead[]>(props.leadsData);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleSelectLead = (id: string) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      toast.success("Lead deleted successfully");
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const handleLeadCreated = (lead: Lead) => {
    setLeads((prevLeads) => [lead, ...prevLeads]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Leads
          </h1>
          <p className="text-muted-foreground">Manage and track your leads</p>
        </div>

        <div className="flex justify-end">
          <AddModal onLeadCreated={handleLeadCreated} />
        </div>
      </div>

      <LeadsTable
        leads={leads}
        selectedId={selectedId}
        onSelectLead={handleSelectLead}
        onDeleteLead={handleDeleteLead}
      />
    </div>
  );
};

export default LeadsClient;
