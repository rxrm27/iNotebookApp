import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

export default function App() {
  return (
    <>
    <NoteState>
      <Router>
        {/* //everythig here */}
        <Navbar />
        {/* Switch is now Routes in ES6 and syntax for defining routes is as below */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}
