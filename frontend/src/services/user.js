import { backendBaseURL, registerUserURL } from "@/constants";
import axios from "axios";

export default class UserService {
  registerUser = async (payload) =>
    axios.post(`${backendBaseURL}/${registerUserURL}`, payload);
}
