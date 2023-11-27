import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllCompanies,
  getApplicantsById,
  getJobById,
  updateApplicationStatus,
} from "../../services/user-service";
import Modal from "../shared/modal";
import ViewJobDialog from "./ViewJob";
import Interview from "./interview";
const tabs = [
  { name: "Applied", value: "applied" },
  { name: "Shortlist", value: "screening" },
  { name: "Interview", value: "interview" },
  { name: "Offer", value: "offered" },
  { name: "Hired", value: "hired" },
  { name: "Rejected", value: "rejected" },
];

export default function Status({ jobId }: any) {
  const [selectedStatus, setSelectedStatus] = useState("applied");
  const [openJob, setOpenJob] = useState(false);
  const [job, setJob] = useState<any>(null);

  const [applied, setApplied] = useState([]);
  const [screening, setScreening] = useState([]);
  const [interview, setInterview] = useState([]);
  const [offered, setOffered] = useState([]);
  const [hired, setHired] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [applications, setApplications] = useState([]);

  const [openInterview, setOpenInterview] = useState(false);

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const getApplications = async () => {
    const jobApplicants = await getApplicantsById(jobId);
    console.log("jobApplicants", jobApplicants);
    if (jobApplicants) {
      setApplications(jobApplicants);
      const appliedData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "applied",
      );
      const hiredData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "hired",
      );
      const interviewData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "interview",
      );
      const offeredData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "offered",
      );
      const rejectedData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "rejected",
      );
      const screeningData = jobApplicants.filter(
        (e: any) => e?.status?.toLowerCase() === "screening",
      );
      setApplied(appliedData);
      setHired(hiredData);
      setInterview(interviewData);
      setOffered(offeredData);
      setRejected(rejectedData);
      setScreening(screeningData);
    }
  };

  console.log("screening res", screening);

  const getJobByIdResp = async () => {
    const jobresp: any = await getJobById(jobId);

    console.log("jobrespbyid", jobresp);

    if (jobresp) {
      setJob(jobresp);
    }
  };

  useEffect(() => {
    getJobByIdResp();
    getApplications();
  }, []);

  const handleStatus = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  const closeDialog = () => {
    setOpenJob(false);
  };

  const updateApplicantStatus = async (status: string, person: any) => {
    console.log("person", person);
    setSelectedApplicant(person);
    if (status === "interview") {
      setOpenInterview(true);
    }
    const updateUser = await updateApplicationStatus({
      status: status,
      applicationId: person?.applicationId,
    });
    console.log("updateUser", updateUser);
    await getApplications();
  };

  const closePopup = () => {
    setOpenInterview(false);
  };

  const getCount = (status: string) => {
    switch (status) {
      case "applied":
        return applied.length;
      case "screening":
        return screening.length;
      case "interview":
        return interview.length;
      case "offered":
        return offered.length;
      case "hired":
        return hired.length;
      case "rejected":
        return rejected.length;
      default:
        return 0;
    }
  };
  return (
    <>
      <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
        {openJob ? (
          <Modal>
            <ViewJobDialog jobData={job} closeDialog={closeDialog} />
          </Modal>
        ) : null}
        {openInterview ? (
          <Modal>
            <Interview
              closePopup={closePopup}
              selectedApplicant={selectedApplicant}
            />
          </Modal>
        ) : null}
        <div className="md:flex md:items-center md:justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Candidates
          </h3>
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setOpenJob(true)}
            >
              View Job
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="status"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              defaultValue={selectedStatus}
              onChange={(e) => handleStatus(e)}
            >
              {tabs?.map((tab, idx) => (
                <option key={idx} value={tab?.value}>
                  {tab?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab, idx) => (
                <a
                  key={idx}
                  className={
                    (tab?.value === selectedStatus
                      ? "border-indigo-500 text-indigo-600 "
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700") +
                    "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium cursor-pointer"
                  }
                  aria-current={
                    tab?.value === selectedStatus ? "page" : undefined
                  }
                  onClick={() => setSelectedStatus(tab?.value)}
                >
                  {tab?.name}({getCount(tab?.value)})
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="mx-auto mt-4 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {applications.map((person: any, idx) =>
          person?.status?.toLowerCase() === selectedStatus ? (
            <li key={idx} className="px-2 py-4 w-52 rounded-lg bg-white shadow">
              <img
                className="mx-auto h-24 w-24 rounded-full object-cover"
                src={person?.userDetails?.profilePicture}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 ">
                {person?.userDetails?.firstName}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {person?.userDetails?.designation}
              </p>
              <a
                href="#"
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                View Resume
              </a>
              <div className="flex justify-evenly py-2">
                {selectedStatus === "applied" ? (
                  <button
                    type="button"
                    className="rounded bg-lime-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => updateApplicantStatus("screening", person)}
                  >
                    Shortlist
                  </button>
                ) : null}
                {selectedStatus === "screening" ? (
                  <button
                    type="button"
                    className="rounded bg-lime-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => updateApplicantStatus("interview", person)}
                  >
                    Interview
                  </button>
                ) : null}
                {selectedStatus === "interview" ? (
                  <button
                    type="button"
                    className="rounded bg-lime-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => updateApplicantStatus("offer", person)}
                  >
                    Offer
                  </button>
                ) : null}
                {selectedStatus === "offered" ? (
                  <button
                    type="button"
                    className="rounded bg-lime-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => updateApplicantStatus("hired", person)}
                  >
                    Hire
                  </button>
                ) : null}
                <button
                  type="button"
                  className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => updateApplicantStatus("rejected", person)}
                >
                  Reject
                </button>
              </div>
            </li>
          ) : null,
        )}
      </ul>
    </>
  );
}
