import React, { useEffect, useState } from "react";
import { getAllCompanies, getJobById } from "../../services/user-service";
import moment from "moment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ViewJobDialog = ({ jobData, closeDialog }: any) => {
  const [companies, setCompanies] = useState<any[]>([]);

  const getAllCompaniesList = async () => {
    const compResp = await getAllCompanies();
    setCompanies(compResp?.companies);
  };

  const findCompanyLogo = (id: string): string => {
    const CompanyObj: any = companies?.find((e: any) => e.companyId === id);
    if (CompanyObj && CompanyObj?.companyLogo) return CompanyObj?.companyLogo;
    else return "";
  };

  useEffect(() => {
    getAllCompaniesList();
  }, []);
  return (
    <div className="overflow-hidden rounded-lg bg-white">
      <div className="bg-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-20 w-20 rounded-full border-2 object-cover"
                src={findCompanyLogo(jobData?.company?.value)}
                alt=""
              />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                {jobData?.jobTitle}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {jobData?.company?.label}
              </p>
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                <svg
                  className="h-1.5 w-1.5 fill-green-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                {jobData?.jobType}
              </span>
              <p className="text-sm font-medium text-gray-600">
                {"Posted on : " +
                  moment
                    .unix(jobData?.metaInfo?.updatedAt)
                    .format("DD MMM YYYY")}
              </p>
            </div>
          </div>
          <CloseOutlinedIcon
            style={{ marginTop: "-80px" }}
            onClick={() => closeDialog()}
          />
        </div>
      </div>
      <div className="bg-white p-6 max-h-96 overflow-y-scroll">
        <div
          className="text-start space-y-2"
          dangerouslySetInnerHTML={{ __html: jobData?.jobDescription }}
        />
      </div>
    </div>
  );
};

export default ViewJobDialog;
