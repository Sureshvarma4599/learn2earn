import SideBar from "../layouts/SideBar";
import { getUsersList } from "../services/user-service";
import { useEffect } from "react";
import Popup from "../components/shared/Popup";

export function Dashboard() {
  return (
    <>
      <SideBar>
        <p>dashboard</p>
      </SideBar>
    </>
  );
}
