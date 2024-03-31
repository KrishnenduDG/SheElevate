import { businessService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BusinessProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    businessService
      .getProfile(username)
      .then((data) => {
        setProfileData(data.user);
      })
      .catch((error) => {
        if (error.response.status === 404) navigate("/registration");
      });
  }, [isLoaded]);

  useEffect(() => {
    if (profileData) setIsLoading(false);
  }, [profileData]);

  return <div>BusinessProfilePage</div>;
};

export default BusinessProfilePage;
