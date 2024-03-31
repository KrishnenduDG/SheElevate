import UploadWidget from "@/components/UploadWidget";
import { businessService, misclService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = () => {
  const uNameRef = useRef();
  const addressRef = useRef();
  const bioRef = useRef();
  const estdRef = useRef();
  const [showcaseImages, setShowcaseImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
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
      showcasePics: showcaseImages, // todo: Dynamic
      productPics: productImages, // todo: Dynamic
    };

    try {
      const regRes = await businessService.registerBusiness(dataPayload);

      console.log(regRes);
      navigate(`/registration`);
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
    <div onSubmit={handleSubmit} className="flex justify-center pt-10">
      <div
        className="
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
          Business Registration
          <span className="text-[#7747ff]"> Page</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Business Registration
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="block relative">
            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Username
            </label>
            <input
              ref={uNameRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Service Account
            </label>
            <input
              ref={addressRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Bio
            </label>
            <input
              ref={bioRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Established At
            </label>
            <input
              ref={estdRef}
              type="number"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <UploadWidget
            images={showcaseImages}
            setImages={setShowcaseImages}
            title={"Upload Showcase Images"}
          />

          <UploadWidget
            images={productImages}
            setImages={setProductImages}
            title={"Upload Product Images"}
          />
          <button
            disabled={isSubmitDisabled}
            type="submit"
            className="bg-[#7747ff] w-full mt-4 m-auto px-6 py-2 rounded text-white text-sm font-normal"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <input type="text" placeholder="Username" ref={uNameRef} />
    //   <input type="text" placeholder="Service Address" ref={addressRef} />
    //   <input type="text" placeholder="Bio" ref={bioRef} />
    //   <input type="number" placeholder="EstablishedAt" ref={estdRef} />

    //   {/* todo: Image Upload to backend and fetching Link */}

    //   <button type="submit" disabled={isSubmitDisabled}>
    //     Submit
    //   </button>
    // </form>
  );
};

export default BusinessRegistration;
