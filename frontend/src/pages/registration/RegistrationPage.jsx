import Button from "@/components/Button";
import Loading from "@/components/Loading";
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
    <div className="absolute top-[30%] left-[50%]">
      <Loading title={"Loading..."} />
    </div>
  ) : (
    <div className="flex h-100 w-full">
      <div>
        <Link to="./business">
          <Button title={"Business Registration"} color={"orange"} />
        </Link>
      </div>
      <div>
        <Link to="./user">
          <Button title={"User Registration"} color={"lime"} />
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
