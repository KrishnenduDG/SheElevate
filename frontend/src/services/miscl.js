import { backendBaseURL, regStatusURL } from "@/constants";
import axios from "axios";

export default class MisclService {
  constructor() {}

  geRegStatus = async (uid) =>
    axios.post(`${backendBaseURL}/${regStatusURL}`, { uid });
}
