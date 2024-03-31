import { backendBaseURL, regStatusURL } from "@/constants";
import axios from "axios";

export default class MisclService {
  constructor() {}

  geRegStatus = async (uid) =>
    (await axios.post(`${backendBaseURL}/${regStatusURL}`, { uid })).data;
}
