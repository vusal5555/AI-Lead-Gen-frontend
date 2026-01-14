"use client";

import { Lead } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import LeadStatusBdge from "./LeadStatusBadge";
import { Input } from "./ui/input";
import { useState, useMemo } from "react";

type Props = {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
};

const LeadsTable = ({ leads, onDeleteLead }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  return (
    <div>
      <Input
        placeholder="Enter the lead name"
        className="my-5 w-fit"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></Input>

      {leads.length === 0 ? (
        <p>No results found</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No leads found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer hover:bg-transparent"
                    >
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.company_name}</TableCell>
                      <TableCell>
                        <LeadStatusBdge
                          status={lead.status}
                          score={lead.score}
                        ></LeadStatusBdge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/leads/${lead.id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <EyeIcon className="w-4 h-4 mr-1 inline-block" />
                          </Link>

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteLead(lead.id);
                            }}
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <Trash2></Trash2>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default LeadsTable;
