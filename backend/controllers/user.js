import { userRepo } from "../repository/index.js";

export default class UserController {
  constructor() {
    this.userRepo = userRepo;
  }

  register = async (req, res) => {
    const {
      name,
      uid,
      userName,
      profilePic,
      email,
      phoneNumber,
      serviceAddress,
      bio,
      showcasePics,
    } = req.body;

    const userRes = await userRepo.getUserByUid(uid);
    if (!userRes.serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    if (userRes.resFlag)
      return res
        .status(409)
        .json({ status: false, msg: "User already exists" });

    const { serverFlag, msg } = await userRepo.registerUser({
      name,
      uid,
      userName,
      profilePic,
      email,
      phoneNumber,
      serviceAddress,
      bio,
      showcasePics,
    });

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    return res.status(201).json({ status: true, msg: "User Registered" });
  };

  getProfile = async (req, res) => {
    const { username } = req.params;
    console.log(username);

    const { serverFlag, resFlag, user, msg } = await userRepo.getUserByUsername(
      username
    );

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    if (!resFlag)
      return res.status(404).json({ status: false, msg: "User not found" });

    return res
      .status(200)
      .json({ status: true, msg: "User found", user: user });
  };
}
