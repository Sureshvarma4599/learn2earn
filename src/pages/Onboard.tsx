import SideBar from "../layouts/SideBar";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import styled from "styled-components";
import { useState } from "react";
import { updateUserRole } from "../services/user-service";
import { useNavigate } from "react-router-dom";
interface CardProps {
  selected: boolean;
}
const Card = styled.div<CardProps>`
  width: 180px;
  height: 160px;
  padding: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  border: 1px solid ${(props) => (props?.selected ? "#4f46e5" : "#f1f5f9")};
`;

export function Onboard() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const updateUser = async () => {
    const update = await updateUserRole(role);
    if (update) navigate("/");
    console.log("update", update);
  };
  return (
    <SideBar>
      <div>
        <h1 className="text-gray-800 text-2xl text-center ">
          Onboard yourself as
        </h1>
        <div className="flex gap-8 w-min mx-auto py-8">
          <Card
            onClick={() => setRole("JOB_SEEKER")}
            selected={role === "JOB_SEEKER"}
          >
            <WorkOutlineIcon
              style={{
                fontSize: "48px",
                color: role === "JOB_SEEKER" ? "#4f46e5" : "#000000",
              }}
            />
            <p>Job Seeker</p>
          </Card>
          <Card
            onClick={() => setRole("RECRUITER")}
            selected={role === "RECRUITER"}
          >
            <BusinessIcon
              style={{
                fontSize: "48px",
                color: role === "RECRUITER" ? "#4f46e5" : "#000000",
              }}
            />
            <p>Recruiter</p>
          </Card>
        </div>
        {role !== "" ? (
          <button
            type="button"
            onClick={() => updateUser()}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            On board
          </button>
        ) : null}
      </div>
    </SideBar>
  );
}
