import React from "react";
import { CheckIcon, UserIcon } from "@heroicons/react/20/solid";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import moment from "moment";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function VerticalStepper({ data }: any) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {data?.experiences.length > 0 &&
          data?.experiences
            ?.sort((a: any, b: any) => b.fromEpoch - a.fromEpoch)
            .map((event: any, idx: any) => (
              <li key={idx}>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          event.isPresent ? "bg-indigo-600" : "bg-indigo-600",
                          "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white",
                        )}
                      >
                        <WorkOutlineOutlinedIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row min-w-0 flex-1 justify-between sm:space-x-4 space-y-2">
                      <div>
                        <p className="font-medium text-gray-900 text-start">
                          {" "}
                          {event.company.label}
                        </p>
                        <p className="text-sm text-gray-500 text-start">
                          {event.isPresent
                            ? "Currently working as"
                            : "Worked as"}{" "}
                          <a
                            href={event.company?.value}
                            className="font-medium text-gray-900"
                          >
                            {event.role}
                          </a>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {event.fromEpoch && (
                          <time dateTime={event.fromEpoch}>
                            {moment.unix(event.fromEpoch).format("MMM YYYY") +
                              (event.isPresent
                                ? " - Present"
                                : " - " +
                                  moment
                                    .unix(event.toEpoch)
                                    .format("MMM YYYY"))}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default VerticalStepper;
