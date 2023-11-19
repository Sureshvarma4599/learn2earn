import SideBar from "../layouts/SideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const Calendar = () => {
  return (
    <div>
      <SideBar>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </SideBar>
    </div>
  );
};

export default Calendar;
