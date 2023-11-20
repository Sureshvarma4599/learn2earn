import SideBar from "../../layouts/SideBar";
import React, { useEffect, useState } from "react";
import { myApplications } from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/shared/modal";
import ApplicationStatus from "../../components/jobSeeker/ApplicationStatus";
const MyApplications = () => {
  const [appData, setAppData] = useState([]);

  const [selected, setSelected] = useState<any>(null);
  const [openPopup, setPopup] = useState(false);
  const navigate = useNavigate();
  const getMyApplicationsData = async () => {
    const data = await myApplications();
    console.log("appdata", data);
    if (data) setAppData(data);
  };

  useEffect(() => {
    getMyApplicationsData();
  }, []);

  const closePopup = () => {
    setPopup(false);
    setSelected(null);
  };

  return (
    <SideBar>
      {openPopup ? (
        <Modal>
          <ApplicationStatus data={selected} closePopup={closePopup} />
        </Modal>
      ) : null}
      <div className="flex flex-col space-y-1.5">
        {appData?.map((item: any, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-between w-full h-auto overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left flex">
              <div>
                <p className="text-lg font-bold text-gray-900 ">
                  {item?.jobDetails[0]?.jobTitle}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {item?.jobDetails[0]?.company?.label}
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
                    setSelected(item);
                    setPopup(true);
                  }}
                >
                  Track Application status
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
    </SideBar>
  );
};
export default MyApplications;
