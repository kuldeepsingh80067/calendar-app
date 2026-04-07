import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Load notes
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("notes")) || [];
    setSavedNotes(data);
  }, []);

  // Save note
  const saveNote = () => {
    if (!note) return;

    const newNote = {
      startDate,
      endDate,
      text: note
    };

    const updatedNotes = [...savedNotes, newNote];
    setSavedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    setNote("");
  };

  // Handle date click
  const handleClick = (day) => {
    if (!startDate) {
      setStartDate(day);
    } else if (!endDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      maxWidth: "400px",
      margin: "auto"
    }}>

      {/* HERO IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="calendar"
        style={{
          width: "100%",
          maxWidth: "350px",
          borderRadius: "10px",
          marginBottom: "10px"
        }}
      />

      <h2>January 2026</h2>

      {/* CALENDAR GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "8px",
        width: "100%",
        maxWidth: "350px",
        margin: "auto",
        background: "#fff",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        {days.map(day => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              transition: "0.2s",
              background:
                day === startDate ? "green" :
                day === endDate ? "red" :
                isInRange(day) ? "lightblue" :
                "#eee",
              color:
                day === startDate || day === endDate ? "white" : "black",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {day}
          </div>
        ))}
      </div>

      {/* NOTES SECTION */}
      <div style={{ marginTop: "20px" }}>
        <h3>Add Note</h3>

        <input
          type="text"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            padding: "8px",
            width: "65%",
            maxWidth: "250px"
          }}
        />

        <button
          onClick={saveNote}
          style={{
            padding: "8px",
            marginLeft: "10px",
            cursor: "pointer"
          }}
        >
          Save
        </button>
      </div>

      {/* SAVED NOTES */}
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Notes</h3>

        {savedNotes.length === 0 && <p>No notes yet</p>}

        {savedNotes.map((n, index) => (
          <div key={index} style={{
            background: "#f1f1f1",
            margin: "5px",
            padding: "8px",
            borderRadius: "5px",
            fontSize: "14px"
          }}>
            📅 {n.startDate} → {n.endDate || n.startDate} : {n.text}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Calendar;