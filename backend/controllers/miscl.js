import { businessRoleLabel, userRoleLabel } from "../constants.js";
import {
  businessRepo,
  categoryRepo,
  userRepo,
  worskpaceRepo,
} from "../repository/index.js";

export default class utilsController {
  constructor() {}

  isValidUsername = (req, res) => {};

  isValidWorkspaceName = async (req, res) => {
    const { name } = req.query;

    const { serverFlag, msg, workspace, resFlag } =
      await worskpaceRepo.getWorkspaceByName(name);

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    return res.status(!resFlag ? 200 : 409).json({
      status: !resFlag,
      msg: resFlag ? "Workspace already exists" : "Workspace name is valid",
    });
  };

  getRegistrationStatus = async (req, res) => {
    const { uid } = req.body;

    const userRes = await userRepo.getUserByUid(uid);
    const businessRes = await businessRepo.getBusinessByBid(uid);

    if (!userRes.serverFlag || !businessRes.serverFlag) {
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });
    }

    if (userRes.resFlag)
      return res.status(200).json({
        status: true,
        msg: "User registered",
        type: userRoleLabel,
      });

    if (businessRes.resFlag)
      return res.status(200).json({
        status: true,
        msg: "Business registered",
        type: businessRoleLabel,
      });

    return res
      .status(404)
      .json({ status: false, msg: "No corresponding registration found" });
  };

  getCategories = async (req, res) => {
    const { serverFlag, msg, categories } =
      await categoryRepo.getAllCategories();

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    return res
      .status(200)
      .json({ status: true, msg: "Categories fetched", categories });
  };
}
