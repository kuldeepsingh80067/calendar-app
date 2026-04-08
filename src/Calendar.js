import React, { useState } from "react";
import "./App.css";

function App() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Images for each month
  const images = [
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get number of days
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // First day of month
  const firstDay = new Date(year, month, 1).getDay();

  // Create days array
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Change month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Save note
  const saveNote = () => {
    if (!note.trim()) return;

    const newNote = {
      id: Date.now(),
      text: note,
      month: month,
      year: year
    };

    setNotes([...notes, newNote]);
    setNote("");
  };

  // Delete note
  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
  };

  // Edit note
  const editNote = (id) => {
    const newText = prompt("Edit your note:");
    if (!newText) return;

    const updated = notes.map(n =>
      n.id === id ? { ...n, text: newText } : n
    );

    setNotes(updated);
  };

  return (
    <div className="app">

      {/* Hook */}
      <div className="hook"></div>

      {/* String */}
      <div className="string"></div>

      {/* Calendar */}
      <div className="calendar">

        {/* Image */}
        <div className="image-box">
          <img src={images[month]} alt="month" />
        </div>

        {/* Navigation */}
        <div className="nav">
          <button onClick={prevMonth}>◀</button>
          <h2>{months[month]} {year}</h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        {/* Week names */}
        <div className="week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days */}
        <div className="days">
          {days.map((d, i) => (
            <div key={i} className="day">{d}</div>
          ))}
        </div>

        {/* Notes input */}
        <div className="notes">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write note..."
          />
          <button onClick={saveNote}>Save</button>
        </div>

        {/* Notes list */}
        <div className="notes-list">
          {notes
            .filter(n => n.month === month && n.year === year)
            .map(n => (
              <div key={n.id} className="note-item">
                <p>{n.text}</p>
                <button onClick={() => editNote(n.id)}>Edit</button>
                <button onClick={() => deleteNote(n.id)}>Delete</button>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;