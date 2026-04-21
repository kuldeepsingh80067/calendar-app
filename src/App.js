import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState({});

  // Load saved notes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || {};
    setNotes(saved);
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setNote(notes[date] || "");
  };

  const saveNote = () => {
    if (!selectedDate) return;
    setNotes({ ...notes, [selectedDate]: note });
  };

  const deleteNote = () => {
    const updated = { ...notes };
    delete updated[selectedDate];
    setNotes(updated);
    setNote("");
  };

  // Generate simple dates
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="container">
      <h1>📅 Productivity Calendar</h1>
      <p>Manage your notes by date</p>

      <div className="calendar">
        {days.map((day) => (
          <div
            key={day}
            className={`day ${selectedDate === day ? "active" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
            {notes[day] && <span className="dot"></span>}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="note-section">
          <h3>Notes for Day {selectedDate}</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note..."
          />
          <div>
            <button onClick={saveNote}>Save</button>
            <button onClick={deleteNote}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
