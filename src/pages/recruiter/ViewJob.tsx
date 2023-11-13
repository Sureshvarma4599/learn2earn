import SideBar from "../../layouts/SideBar";
import { getAllCompanies, getJobById } from "../../services/user-service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const ViewJob = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [job, setJob] = useState<any>(null);

  const { jobId } = useParams();
  const getAllCompaniesList = async () => {
    const compResp = await getAllCompanies();
    setCompanies(compResp?.companies);
  };

  const getJobByIdResp = async () => {
    const jobresp = await getJobById(jobId);
    console.log("jobrespbyid", jobresp);
    setJob(jobresp);
  };

  const findCompanyLogo = (id: string): string => {
    const CompanyObj: any = companies?.find((e: any) => e.companyId === id);
    if (CompanyObj && CompanyObj?.companyLogo) return CompanyObj?.companyLogo;
    else return "";
  };

  useEffect(() => {
    getAllCompaniesList();
    if (jobId) getJobByIdResp();
  }, []);

  return (
    <SideBar>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full border-2 object-cover"
                  src={findCompanyLogo(job?.company?.value)}
                  alt=""
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {job?.jobTitle}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {job?.company?.label}
                </p>
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                  <svg
                    className="h-1.5 w-1.5 fill-green-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {job?.jobType}
                </span>
                <p className="text-sm font-medium text-gray-600">
                  {"Posted on : " +
                    moment.unix(job?.metaInfo?.updatedAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5">
              <dt className="truncate text-sm font-medium text-gray-500">
                No.of.Applicants
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {job?.applicants.length}
              </dd>
            </div>
          </div>
        </div>
        <div className="bg-white p-6">
          <div
            className="text-start space-y-2"
            dangerouslySetInnerHTML={{ __html: job?.jobDescription }}
          />
        </div>
      </div>
    </SideBar>
  );
};
export default ViewJob;
