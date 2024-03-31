import { userLabel } from "@/constants";
import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AddWorkspace = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const nameRef = useRef();
  const descRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataPayload = {
      name: nameRef.current.value,
      desc: descRef.current.value,
      categories: [{ name: "c1", description: "Hello" }], // todo: Dynamic
      images: [{ imgUrl: "1@1.com", caption: "This is Image" }],
    };

    console.log(dataPayload)

    try {
      const creationRes = await userService.createWorkspace(
        dataPayload,
        user.id
      );

      const signedInEntity = JSON.parse(localStorage.getItem("signedInEntity"));
      navigate(`/user/profile/${signedInEntity.userName}`);
    } catch (error) { }
  };

  return isLoaded ? (

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
              Workspace Name
            </label>
            <input
              ref={nameRef}
              type="text"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <label
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
              Description
            </label>
            <textarea
              ref={descRef}
              type="textArea"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>

          <div className="block relative">
            <input type="file" />
          </div>

          <button
            disabled={isSubmitDisabled}
            type="submit"
            className="bg-[#7747ff] w-full mt-4 m-auto px-6 py-2 rounded text-white text-sm font-normal">
            Submit
          </button>

        </form>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Workspace Name" ref={nameRef} />
        <input type="text" placeholder="Description" ref={descRef} /> */}

      {/* todo: Image Upload to backend and fetching Link */}

      {/* <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form> */}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AddWorkspace;
