import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Homepage />} path="/homepage/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Analytics />} path="analytics" />
            <Route element={<Settings />} path="settings" />
          </Route>
          <Route index element={<Navigate to="/homepage/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
