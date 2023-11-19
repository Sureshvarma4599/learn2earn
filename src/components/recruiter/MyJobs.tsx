import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import Modal from "../shared/modal";
import AddNewJob from "../recruiter/AddNewJob";
import {
  getJobsCreatedByMe,
  getAllCompanies,
} from "../../services/user-service";
import { useNavigate } from "react-router-dom";

export default function MyJobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  const [openJob, setOpenJob] = useState(false);

  const navigate = useNavigate();
  const getJobs = async () => {
    const jobsResp = await getJobsCreatedByMe();
    console.log("jobsResp", jobsResp);
    if (jobsResp) setJobs(jobsResp);
  };

  const getAllCompaniesList = async () => {
    const compResp = await getAllCompanies();
    console.log("compResp", compResp);
    setCompanies(compResp?.companies);
  };

  const findCompanyLogo = (id: string): string => {
    const CompanyObj = companies?.find((e) => e.companyId === id);
    if (CompanyObj && CompanyObj?.companyLogo) return CompanyObj?.companyLogo;
    else return "";
  };
  useEffect(() => {
    getJobs();
    getAllCompaniesList();
  }, []);
  return (
    <>
      {openJob ? (
        <Modal>
          <AddNewJob closePopup={() => setOpenJob(false)} />
        </Modal>
      ) : null}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2x">Jobs</h2>
          <button
            type="button"
            className="ml-auto w-40 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenJob(true)}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add New Job
          </button>
        </div>
        {jobs?.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-between w-full h-auto overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left flex">
              <img
                src={findCompanyLogo(item?.company?.value)}
                alt=""
                className="mx-auto h-16 w-16 rounded-full border-2 mr-4"
              />
              <div>
                <p className="text-lg font-bold text-gray-900 ">
                  {item?.jobTitle}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {item?.company?.label}
                </p>
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                  <svg
                    className="h-1.5 w-1.5 fill-green-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  Remote
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              {/*<StarBorderOutlinedIcon className="ml-auto" />*/}
              <button className="relative mb-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span
                  className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                  onClick={() => {
                    navigate(`/recruiter/job/applicants/${item?.jobId}`);
                  }}
                >
                  Track applicants
                </span>
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => navigate(`/recruiter/job/${item?.jobId}`)}
              >
                View Job Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
