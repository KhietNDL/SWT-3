import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.scss";

const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    title: "Stress Management Session",
    start: new Date(2025, 2, 11, 10, 0),
    end: new Date(2025, 2, 11, 11, 0),
    resource: "purple",
  },
  {
    title: "Meeting with Maria Garcia",
    start: new Date(2025, 2, 11, 11, 0),
    end: new Date(2025, 2, 11, 12, 0),
    resource: "yellow",
  },
  {
    title: "Meeting with Sarah Johnson",
    start: new Date(2025, 2, 13, 11, 0),
    end: new Date(2025, 2, 13, 12, 0),
    resource: "green",
  },
  {
    title: "Discussion with Alex Thompson",
    start: new Date(2025, 2, 13, 13, 0),
    end: new Date(2025, 2, 13, 14, 0),
    resource: "yellow",
  },
];

const WeeklySchedule: React.FC = () => {
  const [view, setView] = useState("week");

  return (
    <div className="weekly-schedule">
      <h2>Weekly Schedule</h2>
      <Calendar
        step={60}
        timeslots={1} // Số ô chia trong mỗi giờ
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={{ week: true, day: true }}
        style={{ height: 800 }}
        // Đặt giờ bắt đầu hiển thị là 8h sáng
        min={new Date(2025, 2, 13, 8, 0)}
        // Đặt giờ kết thúc hiển thị là 6h chiều
        max={new Date(2025, 2, 13, 18, 0)}
        // Tự động cuộn đến 8h sáng khi mở
        scrollToTime={new Date(2025, 2, 13, 8, 0)}
        eventPropGetter={(event) => {
          let backgroundColor = "#3174ad";
          if (event.resource === "purple") backgroundColor = "#a855f7";
          if (event.resource === "yellow") backgroundColor = "#facc15";
          if (event.resource === "green") backgroundColor = "#22c55e";
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default WeeklySchedule;
