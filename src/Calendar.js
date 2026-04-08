import React, { useState, useEffect } from "react";

function Calendar() {

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  // load notes
  useEffect(() => {
    let data = localStorage.getItem("notes");
    if (data) {
      setNotes(JSON.parse(data));
    }
  }, []);

  // save note
  function saveNote() {
    if (!noteText || !startDate) return;

    let newNote = {
      month: month,
      year: year,
      start: startDate,
      end: endDate,
      text: noteText
    };

    let updated = [...notes, newNote];
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));

    setNoteText("");
    setStartDate(null);
    setEndDate(null);
  }

  // delete note
  function deleteNote(index) {
    let updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  }

  // edit note
  function editNote(index) {
    let n = notes[index];

    setNoteText(n.text);
    setStartDate(n.start);
    setEndDate(n.end);

    deleteNote(index);
  }

  // click date
  function handleClick(day) {
    if (!startDate) {
      setStartDate(day);
    } else if (!endDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  }

  function isBetween(day) {
    if (!startDate || !endDate) return false;
    return day >= startDate && day <= endDate;
  }

  // next month
  function next() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  // prev month
  function prev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  let days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  return (
    <div style={{
      maxWidth: "550px",
      margin: "30px auto",
      padding: "15px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
    }}>

      {/* image */}
      <img
        src={images[month]}
        alt=""
        style={{
          width: "100%",
          height: "170px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      {/* header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
      }}>
        <button onClick={prev}>◀</button>
        <h3>{months[month]} {year}</h3>
        <button onClick={next}>▶</button>
      </div>

      {/* calendar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: "8px",
        marginTop: "10px"
      }}>
        {days.map((d) => (
          <div
            key={d}
            onClick={() => handleClick(d)}
            style={{
              padding: "8px",
              textAlign: "center",
              borderRadius: "6px",
              background:
                d === startDate ? "green" :
                d === endDate ? "red" :
                isBetween(d) ? "#add8e6" :
                "#eee",
              color: (d === startDate || d === endDate) ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* input */}
      <div style={{ marginTop: "12px" }}>
        <input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write note..."
          style={{
            width: "70%",
            padding: "6px",
            marginRight: "8px"
          }}
        />
        <button onClick={saveNote}>Save</button>
      </div>

      {/* notes */}
      <div style={{ marginTop: "10px" }}>
        {notes.map((n, i) => (
          <div key={i} style={{
            background: "#f4f4f4",
            padding: "8px",
            marginBottom: "6px",
            borderRadius: "6px"
          }}>
            <div>
              {months[n.month]} {n.year} ({n.start}-{n.end || n.start})
            </div>
            <b>{n.text}</b>

            <div style={{ marginTop: "5px" }}>
              <button onClick={() => editNote(i)}>Edit</button>
              <button onClick={() => deleteNote(i)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calendar;