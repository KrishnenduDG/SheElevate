import { businessService, misclService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = () => {
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
      bid: user.id,
      userName: uNameRef.current.value,
      profilePic: user.imageUrl, // todo: Dynamic
      email: user.emailAddresses[0].emailAddress,
      phoneNumber: user.phoneNumbers[0].phoneNumber,
      address: addressRef.current.value,
      bio: bioRef.current.value,
      establishedAt: parseInt(estdRef.current.value),
      categories: [{ name: "c1", description: "Hello" }], // todo: Dynamic
      showcasePics: ["1@1.com", "2@2.com"], // todo: Dynamic
      productPics: ["1@fg.com"], // todo: Dynamic
    };

    try {
      const regRes = await (
        await businessService.registerBusiness(dataPayload)
      ).data;
      console.log(regRes);
      navigate("/business");
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Business with same username or same bid already exists");
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
      <input type="number" placeholder="EstablishedAt" ref={estdRef} />

      {/* todo: Image Upload to backend and fetching Link */}

      <button type="submit" disabled={isSubmitDisabled}>
        Submit
      </button>
    </form>
  );
};

export default BusinessRegistration;
