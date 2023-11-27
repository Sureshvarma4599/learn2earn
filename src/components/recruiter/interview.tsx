import React, { useState } from "react";
import Select from "react-select";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createOrUpdateEvent } from "../../services/user-service";
import { getAppUserId } from "../../services/cookie";
import moment from "moment/moment";

const Interview = ({ closePopup, selectedApplicant }: any) => {
  const [eventTitle, setEventTitle] = useState("");
  const [url, setUrl] = useState<any>("");
  const [fromEpoch, setFromEpoch] = useState<any>(null);
  const [toEpoch, setToEpoch] = useState<any>(null);
  const [fromTime, setFromTime] = useState<any>("");
  const [toTime, setToTime] = useState<any>("");
  const [description, setDescription] = useState("");

  console.log("fromEpoch", fromEpoch);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Perform actions with form data (e.g., send to server)
    console.log("Job Title:", eventTitle);
    console.log("Company:", url);
    console.log("Description:", description);

    const body = {
      name: eventTitle,
      url: url,
      description: description,
      host: getAppUserId(),
      guest: selectedApplicant?.userDetails?.appUserId,
      fromEpoch: fromEpoch + fromTime,
      toEpoch: toEpoch + toTime,
    };
    const eventresponse: any = createOrUpdateEvent(body);
    if (eventresponse) {
      setEventTitle("");
      setDescription("");
      setUrl("");
      closePopup();
    }
    // Clear form fields after submission
  };

  const handleEventDate = (e: any) => {
    const { name, value } = e.target;
    if (name === "fromEpoch") setFromEpoch(moment(value).unix());
    else setToEpoch(moment(value).unix());
  };

  const handleEventTime = (e: any) => {
    const { name, value } = e.target;
    const hours = +value.slice(0, 2) * 3600;
    const minutes = +value.slice(3) * 60;
    if (name === "fromTime") {
      setFromTime(hours + minutes);
    } else {
      setToTime(hours + minutes);
    }
  };

  return (
    <div className="w-full">
      <div className="pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Schedule Interview with{" "}
          <span className="text-indigo-600">
            {selectedApplicant &&
              selectedApplicant?.userDetails?.firstName +
                " " +
                selectedApplicant?.userDetails?.lastName}
          </span>
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-600"
          >
            Event Title
          </label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600"
          >
            Event Link
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div>
          <div className="col-span-full mb-2.5">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-600"
            >
              From
            </label>
            <div className=" flex justify-between space-x-2">
              <input
                type="date"
                name="fromEpoch"
                id="from"
                onChange={handleEventDate}
                defaultValue={
                  fromEpoch ? moment.unix(fromEpoch).format("YYYY-MM-DD") : ""
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
              />
              <input
                type="time"
                name="fromTime"
                id="fromTime"
                onChange={handleEventTime}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-span-full mb-2.5">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-600"
            >
              To
            </label>
            <div className="flex justify-between space-x-2">
              <input
                type="date"
                name="toEpoch"
                id="to"
                onChange={handleEventDate}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="role"
                defaultValue={
                  toEpoch ? moment.unix(toEpoch).format("YYYY-MM-DD") : ""
                }
              />
              <input
                type="time"
                name="toTime"
                id="toTime"
                onChange={handleEventTime}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Event Description
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
export default Interview;
