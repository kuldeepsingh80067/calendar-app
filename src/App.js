import React from "react";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="app">
      {/* Hanging hook */}
      <div className="hook"></div>

      {/* String */}
      <div className="string"></div>
range: {startDate && endDate ? `${startDate}-${endDate}` : startDate}
      {/* Calendar */}
      <Calendar />
    </div>
  );
}

export default App;