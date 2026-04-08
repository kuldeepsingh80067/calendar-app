import React, { useState } from "react";
import "./App.css";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const images = [
  "https://source.unsplash.com/800x400/?winter",
  "https://source.unsplash.com/800x400/?snow",
  "https://source.unsplash.com/800x400/?spring",
  "https://source.unsplash.com/800x400/?flowers",
  "https://source.unsplash.com/800x400/?mountains",
  "https://source.unsplash.com/800x400/?beach",
  "https://source.unsplash.com/800x400/?forest",
  "https://source.unsplash.com/800x400/?nature",
  "https://source.unsplash.com/800x400/?autumn",
  "https://source.unsplash.com/800x400/?city",
  "https://source.unsplash.com/800x400/?festival",
  "https://source.unsplash.com/800x400/?christmas"
];

function Calendar() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // create blank spaces + days
  let days = [];
  for (let i = 0; i < firstDay; i++) days.push("");
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="container">

      <div className="calendar-wrapper">

        {/* TOP IMAGE (LIKE WALL CALENDAR) */}
        <div className="image-section">
          <img src={images[month]} alt="calendar" />
          <div className="month-text">
            {months[month]} {year}
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div className="calendar-body">

          {/* navigation */}
          <div className="nav">
            <button onClick={prev}>◀</button>
            <button onClick={next}>▶</button>
          </div>

          {/* weekdays */}
          <div className="days">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* grid */}
          <div className="grid">
            {days.map((d, i) => (
              <div key={i} className="day">
                {d}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Calendar;