import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Homepage />} path="/homepage" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
