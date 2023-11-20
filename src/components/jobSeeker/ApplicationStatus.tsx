import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CheckIcon } from "@heroicons/react/20/solid";
import moment from "moment/moment";

const steps = [
  {
    name: "Applied",
    value: "applied",
    description: "",
  },
  {
    name: "Screening",
    value: "screening",
    description: "",
  },
  {
    name: "Interview",
    value: "interview",
    description: "",
  },
  {
    name: "Offered",
    value: "offered",
    description: "",
  },
  {
    name: "Hired",
    value: "hired",
    description: "",
  },
  {
    name: "Rejected",
    value: "reject",
    description: "",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const ApplicationStatus = ({ data, closePopup }: any) => {
  console.log("selectedItem", data);
  return (
    <div className="w-full" style={{ minHeight: "320px" }}>
      <div className="w-full flex justify-between">
        <h2>Application Status</h2>
        <CloseOutlinedIcon onClick={() => closePopup()} />
      </div>
      <nav aria-label="Progress" className="py-4">
        <ol role="list" className="overflow-hidden">
          {data?.changeLog?.map((step: any, stepIdx: number) => (
            <li
              key={stepIdx}
              className={stepIdx !== steps.length - 1 ? "pb-10 relative" : ""}
            >
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.status}</span>
                    <span className="text-sm text-gray-500">
                      updated by <span>{step?.updatedBy?.name + " "}</span> on -{" "}
                      {step?.updatedAt
                        ? moment.unix(step?.updatedAt).format("DD MMM YYYY")
                        : ""}
                    </span>
                  </span>
                </a>
              </>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
export default ApplicationStatus;
