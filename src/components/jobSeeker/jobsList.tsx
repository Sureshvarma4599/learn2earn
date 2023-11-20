import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { PlusIcon } from "@heroicons/react/20/solid";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React, { useEffect, useState } from "react";
import Modal from "../shared/modal";
import AddNewJob from "../recruiter/AddNewJob";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  addJobToFav,
  applyJobApp,
  getAllActiveJobs,
  getAllCompanies,
  removeFromJob,
  removeJobApp,
} from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import { getAppUserId } from "../../services/cookie";

export default function JobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  const [openAddJob, setOpenJob] = useState(false);

  const navigate = useNavigate();

  const getJobsData = async () => {
    const jobsResp = await getAllActiveJobs();
    console.log("jobsResp seeker", jobsResp);
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
    getJobsData();
    getAllCompaniesList();
  }, []);

  const applyNow = async (jobId: any) => {
    await applyJobApp({
      userId: getAppUserId(),
      jobId: jobId,
    });
    await getJobsData();
  };
  const fav = async (jobId: any) => {
    await addJobToFav({
      userId: getAppUserId(),
      jobId: jobId,
    });
    await getJobsData();
  };
  const unfav = async (jobId: any) => {
    await removeFromJob({
      userId: getAppUserId(),
      jobId: jobId,
    });
    await getJobsData();
  };

  const revertJob = async (jobId: any) => {
    await removeJobApp({
      userId: getAppUserId(),
      jobId: jobId,
    });
    await getJobsData();
  };

  const findFav = (job: any) => {
    const item = job?.favourites?.includes(getAppUserId());
    console.log("item fav", item);
    return item;
  };

  const findApplied = (job: any) => {
    const item = job?.appliedUsers?.filter(
      (user: any) => user?.userDetails?.appUserId === getAppUserId(),
    );
    if (item?.length > 0) return true;
    return false;
  };

  return (
    <>
      <div className="flex flex-col space-y-4 pt-8">
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
              <div className="text-start">
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
                  {item?.jobType}
                </span>
                <p className="text-sm text-start font-medium text-gray-600">
                  <LocationOnOutlinedIcon style={{ fontSize: "0.75rem" }} />{" "}
                  <span className="text-xs"> {item?.location}</span>
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-col justify-between">
              {findFav(item) ? (
                <StarRateIcon
                  className="ml-auto cursor-pointer"
                  style={{ color: "#ec4899" }}
                  onClick={() => unfav(item?.jobId)}
                />
              ) : (
                <StarBorderOutlinedIcon
                  className="ml-auto cursor-pointer"
                  onClick={() => fav(item?.jobId)}
                />
              )}
              <VisibilityOutlinedIcon
                className="ml-auto text-gray-600 cursor-pointer"
                onClick={() => navigate("/job/" + item?.jobId)}
              />
              {!findApplied(item) ? (
                <button
                  type="button"
                  className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  onClick={() => applyNow(item?.jobId)}
                >
                  Apply Now
                </button>
              ) : (
                <p className="text-lime-600">Applied</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
