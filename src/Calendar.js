import React, { useState } from "react";

const monthNames = [
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
  const [year, setYear] = useState(new Date().getFullYear());
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // 🔥 NEW: Range selection
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setStartDate(null);
    setEndDate(null);
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setStartDate(null);
    setEndDate(null);
  };

  // 🔥 Range logic
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
    if (!note.trim()) return;

    setNotes([
      ...notes,
      {
        text: note,
        month: monthNames[month],
        year: year,
        range: startDate && endDate ? `${startDate}-${endDate}` : startDate
      }
    ]);

    setNote("");
  };

  const handleDelete = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="calendar">

      {/* IMAGE */}
      <div className="image-box">
        <img src={images[month]} alt="month" />
      </div>

      {/* NAV */}
      <div className="nav">
        <button onClick={handlePrev}>◀</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={handleNext}>▶</button>
      </div>

      {/* WEEK */}
      <div className="week">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {/* DAYS */}
      <div className="days">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;

          const isSelected =
            startDate &&
            endDate &&
            day >= startDate &&
            day <= endDate;

          const isStart = day === startDate;
          const isEnd = day === endDate;

          return (
            <div
              key={i}
              className={`day 
                ${isSelected ? "selected" : ""} 
                ${isStart ? "start" : ""} 
                ${isEnd ? "end" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* SELECTED TEXT */}
      {startDate && (
        <p className="selected-text">
          Selected: {startDate}
          {endDate ? ` - ${endDate}` : ""}
        </p>
      )}

      {/* NOTE INPUT */}
      <div className="note-box">
        <input
          type="text"
          placeholder="Write note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      {/* NOTES */}
      <div className="notes">
        {notes.map((n, i) => (
          <div key={i} className="note-item">
            <p>{n.month} {n.year} ({n.range})</p>
            <strong>{n.text}</strong>
            <button onClick={() => handleDelete(i)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calendar;