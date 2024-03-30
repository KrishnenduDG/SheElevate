import { businessRoleLabel, userRoleLabel } from "../constants.js";
import { businessRepo, userRepo } from "../repository/index.js";

export const authTokenMiddleware = async (req, res, next) => {
  const authToken = req.headers["x-user-token"]; // For now, its uid(user) and bid(business)

  if (!authToken)
    return res.status(401).json({
      status: false,
      msg: "Auth Token missing",
    });

  // "User found" case handled
  const { serverFlag, resFlag, user, msg } = await userRepo.getUserByUid(
    authToken
  );
  if (!serverFlag)
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });

  if (resFlag) {
    res.locals.role = userRoleLabel;
    res.locals.signedInEntity = user;
    next();
    return;
  }

  // "Business found" case handled
  const businessRes = await businessRepo.getBusinessByBid(authToken);
  if (!businessRes.serverFlag)
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });

  if (businessRes.resFlag) {
    res.locals.role = businessRoleLabel;
    res.locals.signedInEntity = businessRes.business;
    next();

    return;
  }

  // Not a valid user or business found
  return res.status(403).json({ status: false, msg: "Invalid Token" });
};

export const roleGuardMiddleware = (req, res, next, roles) =>
  roles.indexOf(res.locals.role) != -1
    ? next()
    : res.status(403).json({ status: false, msg: "Access denied" });
