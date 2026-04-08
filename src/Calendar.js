import React, { useState } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const images = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?w=800&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80",
  "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&q=80"
];

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year] = useState(new Date().getFullYear());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDayClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const handleSave = () => {
    if (!note) return;

    setNotes([
      ...notes,
      {
        text: note,
        date: `${startDate}${endDate ? "-" + endDate : ""} ${months[month]}`
      }
    ]);
    setNote("");
  };

  return (
    <div className="calendar">

      <div className="image-box">
        <img src={images[month]} alt="month" />
      </div>

      <div className="nav">
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>◀</button>
        <h2>{months[month]} {year}</h2>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)}>▶</button>
      </div>

      <div className="week">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="days">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;

          const isStart = day === startDate;
          const isEnd = day === endDate;
          const isMiddle =
            startDate &&
            endDate &&
            day > startDate &&
            day < endDate;

          return (
            <div
              key={i}
              className={`day 
                ${isStart ? "start" : ""} 
                ${isEnd ? "end" : ""} 
                ${isMiddle ? "middle" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {startDate && (
        <p className="selected-text">
          Selected: {startDate}{endDate ? ` - ${endDate}` : ""}
        </p>
      )}

      <div className="note-box">
        <input
          placeholder="Write note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <div className="notes">
        {notes.map((n,i)=>(
          <div key={i} className="note-item">
            <p>{n.date}</p>
            <strong>{n.text}</strong>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calendar;