import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());

  let month = date.getMonth();
  let year = date.getFullYear();

  const images = [
    "https://source.unsplash.com/900x400/?mountain",
    "https://source.unsplash.com/900x400/?snow",
    "https://source.unsplash.com/900x400/?spring",
    "https://source.unsplash.com/900x400/?beach",
    "https://source.unsplash.com/900x400/?nature",
    "https://source.unsplash.com/900x400/?summer",
    "https://source.unsplash.com/900x400/?forest",
    "https://source.unsplash.com/900x400/?travel",
    "https://source.unsplash.com/900x400/?workspace",
    "https://source.unsplash.com/900x400/?autumn",
    "https://source.unsplash.com/900x400/?festival",
    "https://source.unsplash.com/900x400/?christmas",
  ];

  function nextMonth() {
    let d = new Date(date);
    d.setMonth(month + 1);
    setDate(d);
  }

  function prevMonth() {
    let d = new Date(date);
    d.setMonth(month - 1);
    setDate(d);
  }

  function getDays() {
    let first = new Date(year, month, 1).getDay();
    let total = new Date(year, month + 1, 0).getDate();

    let arr = [];

    for (let i = 0; i < first; i++) arr.push("");

    for (let i = 1; i <= total; i++) arr.push(i);

    return arr;
  }

  return (
    <div className="app">

      {/* WALL HOOK */}
      <div className="hook"></div>

      {/* SPIRAL */}
      <div className="spiral">
        {Array(20).fill("o").map((_, i) => (
          <span key={i}>○</span>
        ))}
      </div>

      <div className="calendar">

        {/* IMAGE */}
        <div className="image-box">
          <img src={images[month]} />
          <div className="month-text">
            {date.toLocaleString("default", { month: "long" }).toUpperCase()}
            <br />
            {year}
          </div>
        </div>

        {/* BODY */}
        <div className="body">

          {/* NOTES (LEFT SIDE) */}
          <div className="notes">
            <h3>Notes</h3>
            <div className="lines">
              {Array(6).fill().map((_, i) => (
                <div key={i} className="line"></div>
              ))}
            </div>
          </div>

          {/* CALENDAR */}
          <div className="grid">

            <div className="nav">
              <button onClick={prevMonth}>◀</button>
              <h2>
                {date.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <button onClick={nextMonth}>▶</button>
            </div>

            <div className="week">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="days">
              {getDays().map((d, i) => (
                <div key={i} className="day">{d}</div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;