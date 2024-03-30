import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/clerk-react";
import React from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import UserPage from "./pages/registration/UserPage";
import WorkspacePage from "./pages/user/WorkspacePage";

const App = () => {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>

        <Route path="registration" element={<RegistrationPage />}/>

        <Route path="user/profile" element={<ProfilePage />}/>
        <Route path="user/workspace" element={<WorkspacePage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
