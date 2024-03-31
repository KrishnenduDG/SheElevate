import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const { username } = useParams();

  console.log(username);
  useEffect(() => {
    if (!isLoaded) return;
    userService
      .getProfile(username)
      .then((data) => {
        console.log(data.user);
        setProfileData(data.user);
      })
      .catch((error) => {
        if (error.response.status === 404) navigate("/registration");
      });
  }, [isLoaded]);

  useEffect(() => {
    if (profileData) setIsLoading(false);
  }, [profileData]);

  return isLoading ? <div>Loading...</div> : <div>UserProfilePage</div>;
};

export default UserProfilePage;
