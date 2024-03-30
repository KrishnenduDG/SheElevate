import { businessRepo } from "../repository/index.js";

export default class BusinessController {
  constructor() {}

  register = async (req, res) => {
    const {
      bid,
      name,
      userName,
      phoneNumber,
      email,
      address,
      profilePic,
      bio,
      productPics,
      establishedAt,
      categories,
    } = req.body;

    const businessRes = await businessRepo.getBusinessByBid(bid);
    if (!businessRes.serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    if (businessRes.resFlag)
      return res
        .status(409)
        .json({ status: false, msg: "Business already exists" });

    const { serverFlag, resFlag, msg } = await businessRepo.registerBusiness(
      {
        bid,
        name,
        userName,
        phoneNumber,
        email,
        address,
        profilePic,
        bio,
        productPics,
        establishedAt,
      },
      categories
    );

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    if (!resFlag) return res.status(409).json({ status: false, msg });

    return res.status(201).json({ status: true, msg });
  };

  getProfile = async (req, res) => {
    const { username } = req.params;

    const { serverFlag, resFlag, business, msg } =
      await businessRepo.getBusinessByUserName(username);

    if (!serverFlag)
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });

    if (!resFlag)
      return res.status(404).json({ status: false, msg: "business not found" });

    return res
      .status(200)
      .json({ status: true, msg: "Business found", business: business });
  };
}
