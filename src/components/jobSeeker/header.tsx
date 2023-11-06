import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
const stats = [
  {
    name: "Total Jobs",
    stat: "98",
    icon: (
      <WorkOutlineOutlinedIcon style={{ fontSize: "42px", color: "#9333ea" }} />
    ),
  },
  {
    name: "Favourite",
    stat: "6",
    icon: (
      <StarBorderOutlinedIcon style={{ fontSize: "42px", color: "#ec4899" }} />
    ),
  },
  {
    name: "Applied",
    stat: "2",
    icon: (
      <GradingOutlinedIcon style={{ fontSize: "42px", color: "#22c55e" }} />
    ),
  },
];

export default function JobHeader() {
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
