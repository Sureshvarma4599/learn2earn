import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllCompanies } from "../../services/user-service";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createJobOrUpdate } from "../../services/user-service";

interface JobFormProps {
  type?: string; // Update the type to the appropriate type, e.g., string, or a custom type.
  data?: any; // Update the data prop to the appropriate type.
  closePopup?: any;
}
const AddNewJob: React.FC<JobFormProps> = ({ closePopup }) => {
  // Local component state to manage form data
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState<any>(null);
  const [company, setCompany] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [companies, setCompanies] = useState([]);

  const types: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Hybrid",
      value: "hybrid",
    },
    {
      label: "Remote",
      value: "remote",
    },
    {
      label: "Onsite",
      value: "onsite",
    },
  ];

  const getCompaniesData = async () => {
    const companiesResponse = await getAllCompanies();
    console.log("companiesResponse", companiesResponse);
    const modifiedData = companiesResponse?.companies?.map((company: any) => ({
      label: company?.companyName,
      value: company?.companyId,
    }));
    console.log("modifiedData", modifiedData);
    setCompanies(modifiedData);
  };

  useEffect(() => {
    getCompaniesData();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Perform actions with form data (e.g., send to server)
    console.log("Job Title:", jobTitle);
    console.log("Company:", company);
    console.log("Location:", location);
    console.log("Description:", description);

    const body = {
      jobTitle: jobTitle,
      location: location,
      jobType: jobType?.value,
      jobDescription: description,
      applicants: [],
      company: company,
    };
    const jobResponse: any = createJobOrUpdate(body);
    if (jobResponse) {
      setJobTitle("");
      setCompany(null);
      setLocation("");
      setDescription("");
      closePopup();
    }
    // Clear form fields after submission
  };

  const handleCompanyChange = (e: any) => {
    console.log("company change", e);
    setCompany(e);
  };

  const handleJobTypeChange = (e: any) => {
    setJobType(e);
  };

  console.log("company", company);

  return (
    <div className="w-full">
      <h2 className="text-base font-semibold leading-7 text-gray-900 mb-2">
        Add New Job
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div className="col-span-full mb-2 w-full">
          <label
            htmlFor="experience"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Job Type
          </label>
          <Select
            options={types}
            onChange={handleJobTypeChange}
            value={jobType}
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="col-span-full mb-2 w-full">
          <label
            htmlFor="experience"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company
          </label>
          <Select
            options={companies}
            onChange={handleCompanyChange}
            value={company}
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Job Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setDescription(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Job
        </button>
        <button
          type="button"
          className=" ml-4 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => closePopup()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddNewJob;
