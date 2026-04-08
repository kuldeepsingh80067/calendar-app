import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Load notes from localStorage
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
      display: "flex",
      justifyContent: "center",
      padding: "30px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>

      {/* MAIN CARD */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        maxWidth: "380px",
        width: "100%",
        textAlign: "center"
      }}>

        {/* HERO IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="calendar"
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        />

        <h2 style={{ marginBottom: "10px" }}>January 2026</h2>

        {/* CALENDAR GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "8px",
          marginBottom: "20px"
        }}>
          {days.map(day => (
            <div
              key={day}
              onClick={() => handleClick(day)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                transition: "0.2s",
                background:
                  day === startDate ? "#2ecc71" :
                  day === endDate ? "#e74c3c" :
                  isInRange(day) ? "#85c1e9" :
                  "#ecf0f1",
                color:
                  day === startDate || day === endDate ? "white" : "#333",
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
        <div style={{
          background: "#fafafa",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ marginBottom: "10px" }}>📝 Add Note</h3>

          <div style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center"
          }}>
            <input
              type="text"
              placeholder="Write your note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                padding: "8px",
                width: "65%",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />

            <button
              onClick={saveNote}
              style={{
                padding: "8px 12px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Save
            </button>
          </div>

          {/* SAVED NOTES */}
          <div style={{ marginTop: "15px" }}>
            {savedNotes.length === 0 && <p>No notes yet</p>}

            {savedNotes.map((n, index) => (
              <div key={index} style={{
                background: "#ffffff",
                padding: "8px",
                marginTop: "8px",
                borderRadius: "6px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                fontSize: "14px"
              }}>
                📅 {n.startDate} → {n.endDate || n.startDate}
                <br />
                {n.text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Calendar;
