import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <SignOutButton
          signOutCallback={() => {
            localStorage.clear("signedInEntity");
            navigate("/");
          }}
        />
      </SignedIn>
    </div>
  );
};

export default Navbar;
