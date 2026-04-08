import React, { useState, useEffect } from "react";

function Calendar() {

  // months list
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // simple images (just for UI)
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

  // get current date
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // load notes when app starts
  useEffect(() => {
    let data = localStorage.getItem("notes");
    if (data) {
      setNotes(JSON.parse(data));
    }
  }, []);

  // save note
  function saveNote() {
    if (!note) {
      alert("write something first");
      return;
    }

    if (!start) {
      alert("select a date first");
      return;
    }

    let newItem = {
      month: month,
      year: year,
      start: start,
      end: end,
      text: note
    };

    let updated = [...notes, newItem];

    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));

    // reset
    setNote("");
    setStart(null);
    setEnd(null);
  }

  // delete note
  function deleteNote(index) {
    let arr = [...notes];
    arr.splice(index, 1);
    setNotes(arr);
    localStorage.setItem("notes", JSON.stringify(arr));
  }

  // edit note
  function editNote(index) {
    let n = notes[index];

    setNote(n.text);
    setStart(n.start);
    setEnd(n.end);

    deleteNote(index);
  }

  // when user clicks date
  function clickDay(day) {
    if (!start) {
      setStart(day);
    } else if (!end) {
      setEnd(day);
    } else {
      setStart(day);
      setEnd(null);
    }
  }

  // check if day is in range
  function checkRange(day) {
    if (!start || !end) return false;
    return day >= start && day <= end;
  }

  // number of days in month
  let totalDays = new Date(year, month + 1, 0).getDate();

  // first day (0 = sunday)
  let firstDay = new Date(year, month, 1).getDay();

  // blanks
  let blanks = [];
  for (let i = 0; i < firstDay; i++) {
    blanks.push(null);
  }

  // days
  let days = [];
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  let all = [...blanks, ...days];

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

  return (
    <div style={{
      maxWidth: "500px",
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
          height: "160px",
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

      {/* weekdays */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        marginTop: "10px",
        fontWeight: "bold"
      }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
          <div key={i} style={{ textAlign: "center" }}>{d}</div>
        ))}
      </div>

      {/* calendar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: "8px",
        marginTop: "10px"
      }}>
        {all.map((d, i) => (
          <div
            key={i}
            onClick={() => d && clickDay(d)}
            style={{
              padding: "8px",
              textAlign: "center",
              borderRadius: "6px",
              background:
                d === start ? "green" :
                d === end ? "red" :
                checkRange(d) ? "#add8e6" :
                "#eee",
              color: (d === start || d === end) ? "white" : "black",
              cursor: d ? "pointer" : "default",
              opacity: d ? 1 : 0
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* input */}
      <div style={{ marginTop: "12px" }}>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write note..."
          style={{ width: "65%", padding: "6px" }}
        />
        <button onClick={saveNote} style={{ marginLeft: "5px" }}>
          Save
        </button>
      </div>

      {/* notes */}
      <div style={{ marginTop: "10px" }}>
        {notes.length === 0 && <p>No notes</p>}

        {notes.map((n, i) => (
          <div key={i} style={{
            background: "#f2f2f2",
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