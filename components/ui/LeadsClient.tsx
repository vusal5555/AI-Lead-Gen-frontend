"use client";

import React from "react";
import LeadsTable from "../LeadsTable";
import { Lead } from "@/types";
import AddModal from "../AddModal";
import { deleteLead } from "@/lib/api";

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
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const handleLeadCreated = (lead: Lead) => {
    setLeads((prevLeads) => [lead, ...prevLeads]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Leads</h1>
          <p className="text-gray-600">Your leads will appear here</p>
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
