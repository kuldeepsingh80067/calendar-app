import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    setDate(new Date(year, month + dir, 1));
  };

  const saveNote = () => {
    if (note.trim() === "") return;

    setNotes([...notes, {
      text: note,
      month,
      year
    }]);

    setNote("");
  };

  return (
    <div className="app">

      {/* 🔥 HOOK + STRING */}
      <div className="hook"></div>
      <div className="string"></div>

      {/* 🔥 CALENDAR */}
      <div className="calendar">

        {/* IMAGE */}
        <div className="image-box">
          <img
            src={`https://source.unsplash.com/600x300/?nature,${months[month]}`}
            alt="month"
          />
        </div>

        {/* NAV */}
        <div className="nav">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <h2>{months[month]} {year}</h2>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        {/* WEEK */}
        <div className="week">
          <div>Sun</div><div>Mon</div><div>Tue</div>
          <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        {/* DAYS */}
        <div className="days">
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div key={i} className="day">{i + 1}</div>
          ))}
        </div>

        {/* NOTES */}
        <div className="notes">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write note..."
          />
          <button onClick={saveNote}>Save</button>
        </div>

        {/* NOTE LIST */}
        <div className="note-list">
          {notes.map((n, i) => (
            <div key={i}>
              <b>{months[n.month]} {n.year}</b>
              <p>{n.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;