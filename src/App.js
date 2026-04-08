import React, { useState } from "react";
import "./App.css";

function App() {

  // current month/year
  const [currentDate, setCurrentDate] = useState(new Date());

  // selected dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // notes
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // get total days in month
  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  const totalDays = getDaysInMonth(currentDate);

  // create array [1,2,3...]
  const days = [];
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  // month + year text
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // change month
  function changeMonth(step) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + step);
    setCurrentDate(newDate);

    // reset selection
    setStartDate(null);
    setEndDate(null);
  }

  // click on day
  function handleDayClick(day) {
    if (startDate === null) {
      setStartDate(day);
    } else if (endDate === null) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  }

  // check if day is in range
  function isBetween(day) {
    return startDate && endDate && day >= startDate && day <= endDate;
  }

  // save note
  function saveNote() {
    if (!note || !startDate || !endDate) return;

    const newNote =
      startDate +
      "/" +
      (currentDate.getMonth() + 1) +
      " - " +
      endDate +
      "/" +
      (currentDate.getMonth() + 1) +
      " : " +
      note;

    setNotes([...notes, newNote]);
    setNote("");
  }

  return (
    <div className="container">

      {/* Image */}
      <div className="image-section">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="calendar"
        />
        <div className="month-title">
          {monthName} {year}
        </div>
      </div>

      <div className="content">

        {/* Notes */}
        <div className="notes">
          <h3>Notes</h3>

          <textarea
            placeholder="Write your note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={saveNote}>Save</button>

          <div className="saved">
            {notes.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="calendar-section">

          {/* Month controls */}
          <div className="controls">
            <button onClick={() => changeMonth(-1)}>◀</button>
            <span>{monthName} {year}</span>
            <button onClick={() => changeMonth(1)}>▶</button>
          </div>

          {/* Days */}
          <div className="calendar">
            {days.map((day) => (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={
                  "day " +
                  (day === startDate ? "start " : "") +
                  (day === endDate ? "end " : "") +
                  (isBetween(day) ? "range" : "")
                }
              >
                {day}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;