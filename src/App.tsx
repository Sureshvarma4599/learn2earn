import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SideBar } from "./layouts/SideBar";
import "./styles/tailwind.css";
import styled from "styled-components";
import LoginForm from "./components/user/Login";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./services/protectesRoute";
const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
function App() {
  // Check if the current location matches "/login" or "/signup"

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
