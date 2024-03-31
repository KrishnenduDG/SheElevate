import { userService, workspaceService } from "@/services";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WorkspacePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wsData, setWSData] = useState(null);
  const navigate = useNavigate();

  const { workspaceName } = useParams();
  console.log(workspaceName);

  useEffect(() => {
    workspaceService
      .getWorkspaceByName(workspaceName)
      .then((data) => {
        setWSData(data.workspace);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);

  return isLoading ? (
    <div>Loading.....</div>
  ) : (
    <div>
      <h1>Workspace</h1>
    </div>
  );
};

export default WorkspacePage;
