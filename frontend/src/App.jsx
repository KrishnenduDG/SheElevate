import { SignIn, SignInButton, SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/clerk-react";
import React from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="auth" element={<AuthenticationPage />}/>
        <Route path="profile" element={<ProfilePage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
