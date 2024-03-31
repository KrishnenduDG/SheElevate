import {
  backendBaseURL,
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
}
