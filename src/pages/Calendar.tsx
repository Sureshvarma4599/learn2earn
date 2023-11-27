import SideBar from "../layouts/SideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react"; // a plugin!
import { getEvents } from "../services/user-service";
import { getAppUserId } from "../services/cookie";
import moment from "moment";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const getCalendarEvents = async () => {
    const userId = getAppUserId();
    if (userId) {
      const eventsdata = await getEvents(userId);
      console.log("eventsdata", eventsdata?.data);
      const modifiedData = eventsdata?.data?.map((e: any) => ({
        title: e?.name,
        date: moment(e?.fromEpoch * 1000).format("YYYY-MM-DD"),
        description: `${
          moment(e?.fromEpoch * 1000).format("HH:mm") +
          " - " +
          moment(e?.toEpoch * 1000).format("HH:mm")
        }`,
      }));

      console.log("eventsdata", eventsdata?.data);
      console.log("modifiedData", modifiedData);

      setEvents(modifiedData);
    }
  };
  useEffect(() => {
    getCalendarEvents();
  }, []);
  return (
    <div>
      <SideBar>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => (
            <>
              <b>{eventInfo.timeText}</b>
              <p>{eventInfo.event.title}</p>
              {eventInfo.event.extendedProps.description && (
                <p>{eventInfo.event.extendedProps.description}</p>
              )}
            </>
          )}
        />
      </SideBar>
    </div>
  );
};

export default Calendar;
