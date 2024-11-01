import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import Analytics from "./components/analytics/Analytics";
import Settings from "./components/settings/Settings";
import { Toaster } from "react-hot-toast";
import TaskPage from "./pages/Task";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route index element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Homepage />} path="/homepage/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Analytics />} path="analytics" />
            <Route element={<Settings />} path="settings" />
          </Route>
          <Route element={<Navigate to="/homepage/dashboard" />} />
          <Route element={<TaskPage />} path="/task/:taskId" />
          <Route element={<Error />} path="/error" />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
