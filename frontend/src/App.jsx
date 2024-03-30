import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/registration/RegistrationPage";

import Navbar from "./components/Navbar";
import UserPage from "./pages/registration/UserPage";
import BusinessPage from "./pages/registration/BusinessPage";
import ProfilePage from "./pages/ProfilePage";
import WorkspacePage from "./pages/user/WorkspacePage";
import CreatePage from "./pages/user/CreatePage";



const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="registration" element={<RegistrationPage />} />

              <Route path="registration/user" element={<UserPage />} />
              <Route path="registration/business" element={<BusinessPage />} />

              <Route path="user/profile" element={<ProfilePage />} />
              <Route path="user/workspace" element={<WorkspacePage />} />
              <Route path="user/create" element={<CreatePage />} />

          <Route path="business" element={<BusinessPage />} />
              <Route path="business/profile" element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
