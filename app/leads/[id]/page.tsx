import LeadDetails from "@/components/LeadDetails";
import { getLeadById, getReports } from "@/lib/api";

type Props = {
  params: { id: string };
};

const LeadPage = async ({ params }: Props) => {
  const { id } = await params;

  const lead = await getLeadById(id);
  const reports = await getReports(id);

  return (
    <div className="p-6">
      <LeadDetails lead={lead} reports={reports} />
    </div>
  );
};

export default LeadPage;
