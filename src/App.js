import React from "react";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="app">
      <div className="hook"></div>
      <div className="string"></div>

      <div className="container">
        <Calendar />
      </div>
    </div>
  );
}

export default App;