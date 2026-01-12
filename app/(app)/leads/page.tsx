import LeadsClient from "@/components/ui/LeadsClient";
import { getLeads } from "@/lib/api";

const LeadsPage = async () => {
  const response = await getLeads();

  const data = response;

  return <LeadsClient leadsData={data} />;
};

export default LeadsPage;
