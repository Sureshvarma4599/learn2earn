import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { getAppUserId } from "../../services/cookie";
import {
  createOrUpdateProfile,
  getProfile,
  getAllCompanies,
} from "../../services/user-service";
import Select from "react-select";
import moment from "moment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface ProfileFormProps {
  type: string; // Update the type to the appropriate type, e.g., string, or a custom type.
  data: any; // Update the data prop to the appropriate type.
  closePopup: any;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  type,
  data,
  closePopup,
}) => {
  const defaultExperience = {
    company: null,
    fromEpoch: "",
    toEpoch: "",
    isPresent: false,
    role: "",
  };

  const defaultEducation = {
    eduTitle: null,
    fromEpoch: "",
    toEpoch: "",
    speciality: "",
  };

  const defaultCertification = {
    name: null,
    fromEpoch: "",
    toEpoch: "",
    description: "",
  };

  const [currentExperience, setCurrentExperience] =
    useState<any>(defaultExperience);
  const [currentEducation, setCurrentEducation] =
    useState<any>(defaultEducation);
  const [currentCertificate, setCurrentCertificate] =
    useState<any>(defaultCertification);

  const [allExperiences, setAllExperiences] = useState<any>([]);
  const [allEducation, setAllEducation] = useState<any>([]);
  const [allCertification, setAllCertfication] = useState<any>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    profilePicture: "",
    bio: "",
    skills: [],
    mobileNumber: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    language: [],
    experiences: allExperiences,
    education: [],
    certification: [],
  });

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [companies, setCompanies] = useState([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Create a copy of the existing state
      [name]: value, // Update the firstName property
    });
  };

  const handleChangeExperience = (e: any) => {
    const { name, value } = e.target;
    console.log("change", name, value);
    if (name === "toEpoch" || name === "fromEpoch")
      setCurrentExperience({
        ...currentExperience,
        [name]: moment(value).unix(),
      });
    else setCurrentExperience({ ...currentExperience, [name]: value });
  };

  const handleChangeEducation = (e: any) => {
    const { name, value } = e.target;
    console.log("change", name, value);
    if (name === "toEpoch" || name === "fromEpoch")
      setCurrentEducation({
        ...currentEducation,
        [name]: moment(value).unix(),
      });
    else setCurrentEducation({ ...currentEducation, [name]: value });
  };

  const handleChangeCertification = (e: any) => {
    const { name, value } = e.target;
    console.log("change", name, value);
    if (name === "toEpoch" || name === "fromEpoch")
      setCurrentCertificate({
        ...currentCertificate,
        [name]: moment(value).unix(),
      });
    else setCurrentCertificate({ ...currentCertificate, [name]: value });
  };

  const handleIsPresent = () => {
    setCurrentExperience({
      ...currentExperience,
      isPresent: !currentExperience.isPresent,
    });
  };

  const saveToList = () => {
    let list: any[] = allExperiences;
    list.push(currentExperience);
    setAllExperiences(list);
    setCurrentExperience(defaultExperience);
    console.log("list", list);
  };

  const saveToListCer = () => {
    let list: any[] = allCertification;
    list.push(currentCertificate);
    setAllCertfication(list);
    setCurrentCertificate(defaultCertification);
    console.log("list", list);
  };

  const saveToListEdu = () => {
    let list: any[] = allEducation;
    list.push(currentEducation);
    setAllEducation(list);
    setCurrentEducation(defaultEducation);
    console.log("list", list);
  };

  const handleCompanyChange = (e: any) => {
    console.log("company change", e);
    setCurrentExperience({ ...currentExperience, company: e });
  };

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

  const removeExperience = (experience: any) => {
    const exp = allExperiences?.filter((e: any) => e !== experience);
    setAllExperiences(exp);
    console.log(exp, "exp");
  };

  const removeCertification = (certificate: any) => {
    const exp = allCertification?.filter((e: any) => e !== certificate);
    setAllCertfication(exp);
    console.log(exp, "exp");
  };

  const removeEducation = (education: any) => {
    const exp = allCertification?.filter((e: any) => e !== education);
    setAllCertfication(exp);
    console.log(exp, "exp");
  };

  useEffect(() => {
    getCompaniesData();
    if (data) {
      setFormData({
        firstName: data?.firstName,
        lastName: data?.lastName,
        designation: data?.designation,
        profilePicture: data?.profilePicture,
        bio: data?.bio,
        skills: data?.skills,
        mobileNumber: data?.mobileNumber,
        country: data?.country,
        streetAddress: data?.streetAddress,
        city: data?.city,
        state: data?.state,
        pincode: data?.pincode,
        language: data?.language,
        experiences: data?.experiences,
        education: data?.education,
        certification: data?.certification,
      });
      setAllExperiences(data?.experiences);
      setAllEducation(data?.education);
      setAllCertfication(data?.certification);
    }
  }, []);

  const saveForm = async () => {
    const payload: any = formData;
    payload["appUserId"] = await getAppUserId();
    payload["experiences"] = allExperiences;
    payload["certification"] = allCertification;
    payload["education"] = allEducation;
    console.log("save form data", payload);
    const formResposne = await createOrUpdateProfile(payload);
    console.log("formResposne", formResposne);
    closePopup();
  };

  return (
    <form className="w-full">
      <div className="space-y-2">
        {/* profie form */}
        {type === "profile" ? (
          <div className="border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Edit Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  defaultValue={formData.lastName}
                  onChange={handleChange}
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Designation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="designation"
                  defaultValue={formData.designation}
                  onChange={handleChange}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/*{location }*/}
        {type === "location" ? (
          <div className=" border-gray-900/10">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="bio"
                    rows={3}
                    defaultValue={formData.bio}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    id="mobile"
                    name="mobileNumber"
                    defaultValue={formData.mobileNumber}
                    onChange={handleChange}
                    type="mobile"
                    autoComplete="mobile"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    defaultValue={formData.country}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="streetAddress"
                    defaultValue={formData.streetAddress}
                    onChange={handleChange}
                    id="street-address"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    defaultValue={formData.city}
                    onChange={handleChange}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="region"
                    defaultValue={formData.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pincode"
                    defaultValue={formData.pincode}
                    onChange={handleChange}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/*Experience*/}
        {type === "experience" ? (
          <div className="border-gray-900/10 pb-12">
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
                value={currentExperience.company}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Role
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="role"
                  id="role"
                  onChange={handleChangeExperience}
                  defaultValue={currentExperience.role}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="from"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Working from
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="fromEpoch"
                  id="from"
                  onChange={handleChangeExperience}
                  defaultValue={
                    currentExperience?.fromEpoch
                      ? moment
                          .unix(currentExperience?.fromEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="to"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="toEpoch"
                  id="to"
                  onChange={handleChangeExperience}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                  defaultValue={
                    currentExperience?.toEpoch
                      ? moment
                          .unix(currentExperience?.toEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5 relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="isPresent"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleIsPresent}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor="comments"
                  className="font-medium text-gray-900"
                ></label>{" "}
                <span id="comments-description" className="text-gray-500">
                  Are you working currently here ?
                </span>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              onClick={() => saveToList()}
            >
              Save to List
            </button>
            {allExperiences
              ? allExperiences?.map((experience: any, idx: any) => (
                  <div
                    className="flex p-4 rounded-lg bg-white shadow w-full mt-1.5"
                    key={idx}
                  >
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-2">
                      <div>
                        <a href={""} className="font-medium text-gray-900">
                          {experience?.company?.label}
                        </a>
                        <p className="text-sm text-gray-500">
                          {experience?.role}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={experience.fromEpoch}>
                          {moment
                            .unix(experience.fromEpoch)
                            .format("MMM YYYY") +
                            " - " +
                            moment.unix(experience?.toEpoch).format("MMM YYYY")}
                        </time>
                      </div>
                    </div>
                    <CloseOutlinedIcon
                      className="pt-1.5 my-auto cursor-pointer"
                      onClick={() => removeExperience(experience)}
                    />
                  </div>
                ))
              : null}
          </div>
        ) : null}
        {/*certification*/}
        {type === "certification" ? (
          <div className="border-gray-900/10 pb-12">
            <div className="col-span-full mb-2 w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Certificate/Course name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChangeCertification}
                defaultValue={currentCertificate.name}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="role"
              />
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Describe
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChangeCertification}
                  defaultValue={currentCertificate.description}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="fromCer"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                from
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="fromEpoch"
                  id="fromCer"
                  onChange={handleChangeCertification}
                  defaultValue={
                    currentCertificate?.fromEpoch
                      ? moment
                          .unix(currentCertificate?.fromEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="toCer"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="toEpoch"
                  id="toCer"
                  onChange={handleChangeCertification}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                  defaultValue={
                    currentCertificate?.toEpoch
                      ? moment
                          .unix(currentCertificate?.toEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              onClick={() => saveToListCer()}
            >
              Save to List
            </button>
            {allCertification
              ? allCertification?.map((certification: any, idx: any) => (
                  <div
                    className="flex p-4 rounded-lg bg-white shadow w-full mt-1.5"
                    key={idx}
                  >
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-2">
                      <div>
                        <a href={""} className="font-medium text-gray-900">
                          {certification?.name}
                        </a>
                        <p className="text-sm text-gray-500">
                          {certification?.description}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={certification.fromEpoch}>
                          {moment
                            .unix(certification.fromEpoch)
                            .format("MMM YYYY") +
                            " - " +
                            moment
                              .unix(certification?.toEpoch)
                              .format("MMM YYYY")}
                        </time>
                      </div>
                    </div>
                    <CloseOutlinedIcon
                      className="pt-1.5 my-auto cursor-pointer"
                      onClick={() => removeCertification(certification)}
                    />
                  </div>
                ))
              : null}
          </div>
        ) : null}
        {/*education*/}
        {type === "education" ? (
          <div className="border-gray-900/10 pb-12 ">
            <div className="col-span-full mb-2 w-full">
              <label
                htmlFor="eduTitle"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Education
              </label>
              <input
                type="text"
                name="eduTitle"
                id="eduTitle"
                onChange={handleChangeEducation}
                defaultValue={currentEducation.eduTitle}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="role"
              />
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="speciality"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Speciality
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="speciality"
                  id="speciality"
                  onChange={handleChangeEducation}
                  defaultValue={currentEducation.speciality}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="fromEdu"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Working from
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="fromEpoch"
                  id="fromEdu"
                  onChange={handleChangeEducation}
                  defaultValue={
                    currentEducation?.fromEpoch
                      ? moment
                          .unix(currentEducation?.fromEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-span-full mb-2.5">
              <label
                htmlFor="toEdu"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                To
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="toEpoch"
                  id="toEdu"
                  onChange={handleChangeEducation}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="role"
                  defaultValue={
                    currentEducation?.toEpoch
                      ? moment
                          .unix(currentEducation?.toEpoch)
                          .format("YYYY-MM-DD")
                      : ""
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              onClick={() => saveToListEdu()}
            >
              Save to List
            </button>
            {allEducation
              ? allEducation?.map((education: any, idx: any) => (
                  <div
                    className="flex p-4 rounded-lg bg-white shadow w-full mt-1.5"
                    key={idx}
                  >
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-2">
                      <div>
                        <a href={""} className="font-medium text-gray-900">
                          {education?.eduTitle}
                        </a>
                        <p className="text-sm text-gray-500">
                          {education?.speciality}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={education.fromEpoch}>
                          {moment.unix(education.fromEpoch).format("MMM YYYY") +
                            " - " +
                            moment.unix(education?.toEpoch).format("MMM YYYY")}
                        </time>
                      </div>
                    </div>
                    <CloseOutlinedIcon
                      className="pt-1.5 my-auto cursor-pointer"
                      onClick={() => removeEducation(education)}
                    />
                  </div>
                ))
              : null}
          </div>
        ) : null}

        {/*submit form*/}
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => saveForm()}
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => closePopup()}
          className=" ml-4 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </form>
  );
};
export default ProfileForm;
