import SideBar from "../layouts/SideBar";
import JobHeader from "../components/jobSeeker/header";
import MyJobsList from "../components/recruiter/MyJobs";

export default function RecruiterJobs() {
  return (
    <SideBar>
      {/*<JobHeader />*/}
      <MyJobsList />
    </SideBar>
  );
}
