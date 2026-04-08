import React, { useState, useEffect } from "react";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// 🌄 Images for each month
const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1503264116251-35a269479413",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef"
];

const Calendar = () => {
  const [month, setMonth] = useState(5); // June default
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

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

  const saveNote = () => {
    if (!note || !startDate) return;

    const newNote = {
      startDate,
      endDate,
      note,
    };

    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));

    setNote("");
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      {/* 🌄 Image */}
      <img
        src={images[month]}
        alt="month"
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      {/* 🔄 Month Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button onClick={() => setMonth((month - 1 + 12) % 12)}>⬅</button>
        <h2>{monthNames[month]} 2026</h2>
        <button onClick={() => setMonth((month + 1) % 12)}>➡</button>
      </div>

      {/* 📅 Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            style={{
              padding: "18px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              background:
                day === startDate
                  ? "green"
                  : day === endDate
                  ? "red"
                  : isInRange(day)
                  ? "#87cefa"
                  : "#eee",
              color:
                day === startDate || day === endDate ? "white" : "black",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 📝 Notes Section */}
      <div style={{ marginTop: "30px" }}>
        <h3>Add Note</h3>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note..."
          style={{
            width: "70%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={saveNote}
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Save
        </button>
      </div>

      {/* 📌 Saved Notes */}
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Notes</h3>
        {notes.map((n, i) => (
          <div
            key={i}
            style={{
              background: "#f1f1f1",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            📅 {n.startDate} - {n.endDate || n.startDate} : {n.note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;