export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company_name: string;
  company_website?: string;
  linkedin_url?: string;
  status: "new" | "researching" | "qualified" | "not_qualified";
  score?: number;
  score_details?: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export type Report = {
  id: string;
  report_type: string;
  title: string;
  content: string;
  is_markdown: boolean;
  created_at: string;
};

export type LeadStats = {
  total: number;
  new: number;
  researching: number;
  qualified: number;
  not_qualified: number;
  average_score: number;
  conversion_rate: number;
};
