import React, { useState } from "react";
import "./App.css";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// simple image list (month wise)
const monthImages = [
  "https://source.unsplash.com/800x300/?winter",
  "https://source.unsplash.com/800x300/?snow",
  "https://source.unsplash.com/800x300/?spring",
  "https://source.unsplash.com/800x300/?flowers",
  "https://source.unsplash.com/800x300/?mountains",
  "https://source.unsplash.com/800x300/?beach",
  "https://source.unsplash.com/800x300/?forest",
  "https://source.unsplash.com/800x300/?nature",
  "https://source.unsplash.com/800x300/?autumn",
  "https://source.unsplash.com/800x300/?city",
  "https://source.unsplash.com/800x300/?festival",
  "https://source.unsplash.com/800x300/?christmas"
];

function Calendar() {

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [inputNote, setInputNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  // total days
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // go previous
  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // go next
  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // save note
  const handleSave = () => {
    if (inputNote.trim() === "") return;

    const newNote = {
      text: inputNote,
      month: currentMonth,
      year: currentYear
    };

    setAllNotes([...allNotes, newNote]);
    setInputNote("");
  };

  return (
    <div className="app">

      <div className="calendar-card">

        {/* top image */}
        <div className="image-section">
          <img src={monthImages[currentMonth]} alt="month" />
          <div className="overlay">
            {monthNames[currentMonth]} {currentYear}
          </div>
        </div>

        {/* month navigation */}
        <div className="nav">
          <button onClick={handlePrev}>◀</button>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <button onClick={handleNext}>▶</button>
        </div>

        {/* day names */}
        <div className="days">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="day-name">{d}</div>
          ))}
        </div>

        {/* calendar days */}
        <div className="grid">
          {Array.from({ length: totalDays }).map((_, index) => (
            <div key={index} className="day">
              {index + 1}
            </div>
          ))}
        </div>

        {/* notes */}
        <div className="notes">
          <input
            type="text"
            placeholder="Write note..."
            value={inputNote}
            onChange={(e) => setInputNote(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>

          {/* show notes */}
          {allNotes.map((n, i) => (
            <div key={i} className="note-card">
              <b>{monthNames[n.month]} {n.year}</b>
              <p>{n.text}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Calendar;