import SideBar from "../../layouts/SideBar";
import { getAllCompanies } from "../../services/user-service";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid";
export default function RecruiterCompanies() {
  const [companies, setCompanies] = useState([]);

  const getAllCompaniesList = async () => {
    const data = await getAllCompanies();
    setCompanies(data?.companies);
    console.log("data?.companies", data?.companies);
  };

  useEffect(() => {
    getAllCompaniesList();
  }, []);
  return (
    <SideBar>
      <div>
        <h2 className="text-xl font-medium leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {/*Companies*/}
        </h2>
        <div className="flex justify-evenly ">
          <div className=""></div>
          <button
            type="button"
            className="ml-auto mb-4 w-48 h-10 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add New Company
          </button>
        </div>

        <div className="flex flex-wrap justify-around space-x-2">
          {companies?.map((company: any) => (
            <div className="p-4 w-72 rounded-lg bg-white shadow">
              <img
                src={company?.companyLogo}
                alt=""
                className="mx-auto h-24 w-24 rounded-full border-2 object-fit "
              />
              <p className="text-lg font-bold text-gray-900 ">
                {company?.companyName}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {company?.companyDescription}
              </p>
              <p className="text-sm font-medium text-gray-600">
                {company?.companySize}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SideBar>
  );
}
