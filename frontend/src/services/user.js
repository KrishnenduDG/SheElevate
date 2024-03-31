import {
  backendBaseURL,
  createWorkspaceURL,
  getUserProfileRoute,
  registerUserURL,
} from "@/constants";
import axios from "axios";

export default class UserService {
  registerUser = async (payload) =>
    (await axios.post(`${backendBaseURL}/${registerUserURL}`, payload)).data;

  getProfile = async (username) =>
    (await axios.get(`${backendBaseURL}/${getUserProfileRoute}/${username}`))
      .data;

  createWorkspace = async (payload, uid) =>
    (
      await axios.post(`${backendBaseURL}/${createWorkspaceURL}`, payload, {
        headers: { "x-user-token": uid },
      })
    ).data;

  getWorkspaces = async (uid) =>
    (
      await axios.get(`${backendBaseURL}/${createWorkspaceURL}`, {
        headers: { "x-user-token": uid },
      })
    ).data;
}
