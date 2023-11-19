import React from "react";
import logo from "./logo.svg";
import "./App.css";
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
import { Onboard } from "./pages/Onboard";
import Profile from "./pages/jobSeeker/Profile";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterCompany from "./pages/recruiter/RecruiterCompany";
import Settings from "./pages/Settings";
import Companies from "./pages/recruiter/Company";
import Jobs from "./pages/jobSeeker/Jobs";
import ViewJob from "./pages/recruiter/ViewJob";
import Calendar from "./pages/Calendar";
import TrackApplicants from "./pages/recruiter/TrackApplicants";
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
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
            {/*<Route path="/jobs" element={<Profile />} />*/}
            <Route path="/my-profile/recruiter" element={<Profile />} />
            <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
            <Route path="/recruiter/company" element={<RecruiterCompany />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/job/:jobId" element={<ViewJob />} />
            <Route path="/recruiter/job/:jobId" element={<ViewJob />} />
            <Route
              path="/recruiter/job/applicants/:jobId"
              element={<TrackApplicants />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
