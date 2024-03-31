import { userLabel } from "@/constants";
import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useRef, useState } from "react";
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

    try {
      const creationRes = await userService.createWorkspace(
        dataPayload,
        user.id
      );

      const signedInEntity = JSON.parse(localStorage.getItem("signedInEntity"));
      navigate(`/user/profile/${signedInEntity.userName}`);
    } catch (error) {}
  };

  return isLoaded ? (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Workspace Name" ref={nameRef} />
        <input type="text" placeholder="Description" ref={descRef} />

        {/* todo: Image Upload to backend and fetching Link */}

        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AddWorkspace;
