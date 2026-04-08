import React, { useState, useEffect } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// simple images (one per month)
const monthImages = [
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

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  // load notes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  // save notes
  const handleSave = () => {
    if (!text || !start) return;

    const newNote = {
      month,
      year,
      start,
      end,
      text
    };

    const updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
    setText("");
  };

  // handle date click
  const handleDayClick = (day) => {
    if (!start) {
      setStart(day);
    } else if (!end) {
      setEnd(day);
    } else {
      setStart(day);
      setEnd(null);
    }
  };

  const inRange = (day) => {
    if (!start || !end) return false;
    return day >= start && day <= end;
  };

  // change month
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // simple days (1–31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      borderRadius: "12px",
      background: "#fff",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    }}>

      {/* IMAGE */}
      <img
        src={monthImages[month]}
        alt="month"
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px"
      }}>
        <button onClick={prevMonth}>⬅</button>
        <h3>{months[month]} {year}</h3>
        <button onClick={nextMonth}>➡</button>
      </div>

      {/* CALENDAR */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "10px",
        marginTop: "15px"
      }}>
        {days.map((d) => (
          <div
            key={d}
            onClick={() => handleDayClick(d)}
            style={{
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                d === start
                  ? "green"
                  : d === end
                  ? "red"
                  : inRange(d)
                  ? "#add8e6"
                  : "#eee",
              color:
                d === start || d === end ? "white" : "black"
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* NOTE INPUT */}
      <div style={{ marginTop: "15px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          style={{
            width: "70%",
            padding: "8px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      {/* NOTES LIST */}
      <div style={{ marginTop: "15px" }}>
        {notes.map((n, i) => (
          <div key={i} style={{
            padding: "6px",
            marginBottom: "6px",
            background: "#f2f2f2",
            borderRadius: "6px"
          }}>
            {months[n.month]} {n.year} ({n.start}-{n.end || n.start}) : {n.text}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calendar;