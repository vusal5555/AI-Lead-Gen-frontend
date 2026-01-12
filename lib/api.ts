"use server";

import { Lead, LeadStats } from "@/types";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getLeads() {
  const response = await fetch(`${API_URL}/api/leads`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await response.json();

  return data;
}

export async function getLeadById(id: string) {
  const response = await fetch(`${API_URL}/api/leads/${id}`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lead");
  }

  const data = await response.json();
  return data;
}

export async function getReports(leadId: string) {
  const response = await fetch(`${API_URL}/api/research/reports/${leadId}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  const data = await response.json();

  return data;
}

export async function createLead(leadData: {
  name: string;
  email: string;
  company_name: string;
  company_website?: string;
  linkedin_url?: string;
}) {
  const response = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  // Invalidate all cached data
  revalidatePath("/", "layout");

  const data = await response.json();
  return data;
}

export async function deleteLead(id: string) {
  const response = await fetch(`${API_URL}/api/leads/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }

  revalidatePath("/", "layout");

  return {
    message: "Lead deleted successfully",
  };
}

export async function startResearch(leadId: string) {
  const response = await fetch(`${API_URL}/api/research/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lead_id: leadId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to start research");
  }

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath(`/leads/${leadId}`);

  const data = await response.json();
  return data;
}

export async function getLeadStats(): Promise<LeadStats> {
  const response = await fetch(`${API_URL}/api/leads/stats`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("getLeadStats error:", {
      status: response.status,
      statusText: response.statusText,
      detail: errorData,
    });
    throw new Error(
      errorData.detail || `Failed to fetch lead stats: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
}

export async function getRecentLeads(limit: number = 5): Promise<Lead[]> {
  const response = await fetch(`${API_URL}/api/leads?limit=${limit}`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent leads");
  }

  return response.json();
}
