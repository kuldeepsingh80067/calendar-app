import React, { useState, useEffect } from "react";

function Calendar() {

  // selected dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // note input
  const [note, setNote] = useState("");

  // saved notes
  const [savedNotes, setSavedNotes] = useState([]);

  // create days manually (simple way)
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  // load notes from local storage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setSavedNotes(storedNotes);
    }
  }, []);

  // save note
  function saveNote() {
    if (!note) return;

    const newNote = {
      start: startDate,
      end: endDate,
      text: note
    };

    const updated = [...savedNotes, newNote];

    setSavedNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));

    setNote("");
  }

  // handle day click
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

  // check range
  function isBetween(day) {
    return startDate && endDate && day >= startDate && day <= endDate;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      padding: "30px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>

      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        width: "350px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      }}>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="calendar"
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <h2>January 2026</h2>

        {/* Calendar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "6px"
        }}>
          {days.map((day) => (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                cursor: "pointer",
                background:
                  day === startDate ? "green" :
                  day === endDate ? "red" :
                  isBetween(day) ? "lightblue" :
                  "#eee",
                color:
                  day === startDate || day === endDate ? "#fff" : "#000"
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{ marginTop: "15px" }}>
          <h3>Add Note</h3>

          <input
            type="text"
            placeholder="Write something..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: "70%",
              padding: "6px",
              marginRight: "5px"
            }}
          />

          <button onClick={saveNote}>
            Save
          </button>

          {/* Saved notes */}
          <div style={{ marginTop: "10px" }}>
            {savedNotes.length === 0 && <p>No notes yet</p>}

            {savedNotes.map((item, index) => (
              <div key={index} style={{
                marginTop: "5px",
                padding: "5px",
                background: "#f0f0f0",
                borderRadius: "5px"
              }}>
                {item.start} - {item.end || item.start}: {item.text}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Calendar;
