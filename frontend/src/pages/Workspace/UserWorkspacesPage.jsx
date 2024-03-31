import React from "react";

import { userService } from "@/services";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

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
        setWorkspacesData(data)
      })
      .catch((error) => console.log(error));
  }, [isLoaded]);

  useEffect(() => {
    if (workspacesData) setIsLoading(false);
  }, [workspacesData]);

  return isLoading ? (
    <div className="flex justify-center pt-20">
      <Loading />
    </div>
  ) : (
    <div className="py-4">
      <div >
        <h1 className="text-xl font-semibold text-center pb-4">Your Workshop page</h1>
        <hr />
        <div className="flex justify-center pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            {/* {workspacesData.map((item) => (
              
              <ProductCard />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWorkspacesPage;
