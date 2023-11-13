import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import { getAllActiveJobs, getAllCompanies } from "../../services/user-service";
import { useEffect, useState } from "react";
import { getAppUserId } from "../../services/cookie";

export default function JobHeader() {
  const [companies, setCompanies] = useState<any>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [favourites, setFavourites] = useState([]);
  const [applied, setApplied] = useState([]);

  const getAllCompaniesList = async () => {
    const compResp = await getAllCompanies();
    console.log("compResp", compResp);
    setCompanies(compResp?.companies);
  };

  const getJobsData = async () => {
    const jobsResp = await getAllActiveJobs();
    console.log("jobsResp seeker", jobsResp);
    if (jobsResp) setJobs(jobsResp);
  };
  useEffect(() => {
    getAllCompaniesList();
    getJobsData();
  }, []);

  const stats = [
    {
      name: "Total Jobs",
      stat: jobs?.length,
      icon: (
        <WorkOutlineOutlinedIcon
          style={{ fontSize: "42px", color: "#9333ea" }}
        />
      ),
    },
    {
      name: "Favourite",
      stat: jobs.filter((e: any) => e?.favourites?.includes(getAppUserId()))
        .length,
      icon: (
        <StarBorderOutlinedIcon
          style={{ fontSize: "42px", color: "#ec4899" }}
        />
      ),
    },
    {
      name: "Applied",
      stat: jobs.filter((e: any) => e?.applicants?.includes(getAppUserId()))
        .length,
      icon: (
        <GradingOutlinedIcon style={{ fontSize: "42px", color: "#22c55e" }} />
      ),
    },
  ];
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="flex justify-around overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div>{item.icon}</div>
            <div>
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
