import { Form } from "@/components/Form";
import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const uNameRef = useRef();
  const addressRef = useRef();
  const bioRef = useRef();
  const estdRef = useRef();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitDisabled(true);

    const dataPayload = {
      name: user.fullName,
      uid: user.id,
      userName: uNameRef.current.value,
      profilePic: user.imageUrl, // todo: Dynamic
      email: user.emailAddresses[0].emailAddress,
      phoneNumber: user.phoneNumbers[0].phoneNumber,
      serviceAddress: addressRef.current.value,
      bio: bioRef.current.value,
      showcasePics: ["1@1.com", "2@2.com"], // todo: Dynamic
    };

    try {
      const regRes = await userService.registerUser(dataPayload);
      navigate(`/registration`);
    } catch (error) {
      if (error.response.status === 409) {
        console.log("User with same username or same uid already exists");
      }
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  useEffect(() => {
    if (isLoaded) console.log(user);
  }, [isLoaded]);


  return !isLoaded ? (
    <div>Loading....</div>
  ) : (
    <div onSubmit={handleSubmit} className="flex justify-center pt-10">
      <div className="
        relative 
        flex 
        flex-col 
        p-4 
        rounded-xl 
        text-black 
        bg-white
        border
        drop-shadow-xl w-[400px]
        
      "
      >
        <div
          className="
            text-2xl 
            font-bold 
            mb-2 
            text-[#1e0e4b] 
            text-center
            "
        >
          Welcome back to
          <span className="text-[#7747ff]">App</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          User Registration
        </div>
        <form
          onSubmit={handleSubmit}
         className="flex flex-col gap-3">
          <div className="block relative">
            <label
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Username
            </label>
            <input
              ref={uNameRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Service Account
            </label>
            <input
              ref={addressRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Bio
            </label>
            <input
              ref={bioRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <button
            disabled={isSubmitDisabled}
            type="submit"
            className="bg-[#7747ff] w-full mt-4 m-auto px-6 py-2 rounded text-white text-sm font-normal">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
