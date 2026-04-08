/* basic page setup */
body {
  margin: 0;
  font-family: Arial;
  background-color: #f2f2f2;
}

/* center the calendar */
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* main box */
.calendar-wrapper {
  width: 400px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* image part */
.image-section {
  position: relative;
}

.image-section img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

/* month text on image */
.month-overlay {
  position: absolute;
  bottom: 10px;
  right: 12px;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

/* inside content */
.calendar-body {
  padding: 12px;
}

/* navigation */
.nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.nav button {
  background: #eee;
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
}

.nav button:hover {
  background: #ddd;
}

/* days name */
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.day-name {
  padding: 5px;
  font-size: 13px;
}

/* calendar grid */
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

/* each day */
.day {
  background: #f4f4f4;
  padding: 8px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}

.day:hover {
  background: #ddd;
}

/* notes */
.notes {
  margin-top: 12px;
}

.notes input {
  width: 60%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.notes button {
  padding: 6px 10px;
  margin-left: 5px;
  border: none;
  background: #2196f3;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

/* saved notes */
.note-card {
  margin-top: 8px;
  background: #f7f7f7;
  padding: 6px;
  border-radius: 5px;
}

/* ===================== */
/* mobile (simple fix) */
/* ===================== */

@media (max-width: 500px) {

  .calendar-wrapper {
    width: 95%;
  }

  .image-section img {
    height: 140px;
  }

  .month-overlay {
    font-size: 14px;
  }

  .day {
    padding: 6px;
    font-size: 12px;
  }

  .notes input {
    width: 100%;
    margin-bottom: 6px;
  }

  .notes button {
    width: 100%;
    margin-left: 0;
  }
}