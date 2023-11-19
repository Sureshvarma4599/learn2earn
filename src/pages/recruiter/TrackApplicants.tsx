import SideBar from "../../layouts/SideBar";
import Status from "../../components/recruiter/Applicants";
import { useParams } from "react-router-dom";

const TrackApplicants = () => {
  const { jobId } = useParams();
  return (
    <SideBar>
      <Status jobId={jobId} />
    </SideBar>
  );
};
export default TrackApplicants;
