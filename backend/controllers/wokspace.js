import { userRepo, worskpaceRepo } from "../repository/index.js";

export default class WorkspaceController {
  getWorkspaceDetails = async (req, res) => {
    const { serverFlag, resFlag, msg, workspace } =
      await worskpaceRepo.getWorkspaceByName(req.params.name);

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server error" });

    if (!resFlag)
      return res
        .status(404)
        .json({ status: false, msg: "Workspace not found" });

    return res
      .status(200)
      .json({ status: true, msg: "Workspace Fetched", workspace: workspace });
  };

  createUserWorkspace = async (req, res) => {
    const { name, desc, images, categories } = req.body;
    const { signedInEntity } = res.locals;

    // Creating the Workspace
    const workspaceRes = await worskpaceRepo.createWorkspace(
      { name, desc },
      categories,
      signedInEntity.uid
    );
    if (!workspaceRes.serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server error" });
    if (!workspaceRes.resFlag)
      return res.status(409).json({ status: false, msg: workspaceRes.msg });

    // Creating the images
    const imgRes = await worskpaceRepo.uploadWorkspaceImages(
      images,
      workspaceRes.workspace.wid
    );

    return res.status(201).json({ status: true, msg: "Workspace created" });
  };

  getUserWorkspaces = async (req, res) => {
    const { signedInEntity } = res.locals;
    const uid = signedInEntity.uid;

    const { serverFlag, msg, workspaces } = await userRepo.getWorkspaces(uid);

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server error" });

    return res
      .status(200)
      .json({ status: true, msg: "Workspaces fetched", workspaces });
  };

  deleteUserWorkspace = (req, res) => {};

  /**
    Route handler for getting all the public workspaces based on the category
   */
  getWorkspaces = (req, res) => {};
}
