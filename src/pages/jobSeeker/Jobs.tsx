import SideBar from "../../layouts/SideBar";
import JobHeader from "../../components/jobSeeker/header";
import JobsList from "../../components/jobSeeker/jobsList";
export default function Jobs() {
  return (
    <SideBar>
      <JobHeader />
      <JobsList />
    </SideBar>
  );
}
