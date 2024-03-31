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
      const regRes = await (await userService.registerUser(dataPayload)).data;
      console.log(regRes);
      navigate(`/user/profile/${uNameRef.current.value}`);
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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" ref={uNameRef} />
      <input type="text" placeholder="Service Address" ref={addressRef} />
      <input type="text" placeholder="Bio" ref={bioRef} />

      {/* todo: Image Upload to backend and fetching Link */}

      <button type="submit" disabled={isSubmitDisabled}>
        Submit
      </button>
    </form>
  );
};

export default UserRegistration;
