import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen((value) => !value);
    console.log(isOpen);
  };

  return (
    <header className=" bg-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to={"/"} className="block text-teal-600">
              logo
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <div className="flex items-center gap-6 font-lignt"></div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {}
            <div className="sm:flex sm:gap-4">
              <SignedIn>
                <div className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                  <SignOutButton
                    signOutCallback={() => {
                      localStorage.clear("signedInEntity");
                      navigate("/");
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <div className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
