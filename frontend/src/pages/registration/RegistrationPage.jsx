import { userLabel } from "@/constants";
import { misclService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    misclService
      .geRegStatus(user.id)
      .then((data) => {
        const userName = data.signedInEntity.userName;
        console.log(data);
        localStorage.setItem(
          "signedInEntity",
          JSON.stringify({ ...data.signedInEntity, type: data.type })
        );

        data.type === userLabel
          ? navigate(`/user/profile/${userName}`)
          : navigate(`/business/profile/${userName}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
        }
      })
      .finally(() => setIsLoading(false));
  }, [isLoaded]);

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div>
      <div>
        <Link to="./business">Business Registration</Link>
      </div>
      <div>
        <Link to="./user">User Registration</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
