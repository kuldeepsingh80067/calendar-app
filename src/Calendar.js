import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // note input
  const [text, setText] = useState("");

  // notes list
  const [allNotes, setAllNotes] = useState([]);

  // load saved notes
  useEffect(() => {
    let data = localStorage.getItem("notes");
    if (data) {
      setAllNotes(JSON.parse(data));
    }
  }, []);

  // save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }, [allNotes]);

  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  // simple images (intern style hardcoded)
  let images = [
    "https://source.unsplash.com/800x300/?winter",
    "https://source.unsplash.com/800x300/?snow",
    "https://source.unsplash.com/800x300/?spring",
    "https://source.unsplash.com/800x300/?beach",
    "https://source.unsplash.com/800x300/?mountain",
    "https://source.unsplash.com/800x300/?summer",
    "https://source.unsplash.com/800x300/?forest",
    "https://source.unsplash.com/800x300/?nature",
    "https://source.unsplash.com/800x300/?office",
    "https://source.unsplash.com/800x300/?autumn",
    "https://source.unsplash.com/800x300/?festival",
    "https://source.unsplash.com/800x300/?christmas",
  ];

  // get days
  function getDays() {
    let firstDay = new Date(year, month, 1).getDay();
    let totalDays = new Date(year, month + 1, 0).getDate();

    let arr = [];

    for (let i = 0; i < firstDay; i++) {
      arr.push("");
    }

    for (let i = 1; i <= totalDays; i++) {
      arr.push(i);
    }

    return arr;
  }

  // next month
  function nextMonth() {
    let d = new Date(currentDate);
    d.setMonth(month + 1);
    setCurrentDate(d);
  }

  // prev month
  function prevMonth() {
    let d = new Date(currentDate);
    d.setMonth(month - 1);
    setCurrentDate(d);
  }

  // add note
  function saveNote() {
    if (text === "") return;

    let obj = {
      id: Date.now(),
      text: text,
      month: month,
      year: year,
    };

    setAllNotes([...allNotes, obj]);
    setText("");
  }

  // delete
  function deleteNote(id) {
    let newList = allNotes.filter((n) => n.id !== id);
    setAllNotes(newList);
  }

  // edit
  function editNote(id) {
    let newText = prompt("Edit note");
    if (!newText) return;

    let updated = allNotes.map((n) => {
      if (n.id === id) {
        return { ...n, text: newText };
      }
      return n;
    });

    setAllNotes(updated);
  }

  return (
    <div className="app">
      <div className="calendar">

        {/* IMAGE */}
        <img src={images[month]} className="top-img" />

        {/* TITLE */}
        <div className="title">
          <button onClick={prevMonth}>◀</button>

          <h2>
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>

          <button onClick={nextMonth}>▶</button>
        </div>

        {/* WEEK */}
        <div className="week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* DAYS */}
        <div className="days">
          {getDays().map((d, i) => (
            <div key={i} className="box">
              {d}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="input-box">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write note..."
          />
          <button onClick={saveNote}>Save</button>
        </div>

        {/* NOTES */}
        <div className="notes">
          {allNotes
            .filter((n) => n.month === month && n.year === year)
            .map((n) => (
              <div key={n.id} className="note">
                <p>{n.text}</p>

                <button onClick={() => editNote(n.id)}>Edit</button>
                <button onClick={() => deleteNote(n.id)}>Delete</button>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default App;