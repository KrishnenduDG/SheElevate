import React from "react";

import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWorkspacesPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [workspacesData, setWorkspacesData] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    userService
      .getWorkspaces(user.id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [isLoaded]);

  useEffect(() => {
    if (workspacesData) setIsLoading(false);
  }, [workspacesData]);

  return isLoading ? <div>Loading...</div> : <div>UserProfilePage</div>;
};

export default UserWorkspacesPage;
