import { backendBaseURL, getWorkspaceDetailsURL } from "@/constants";
import axios from "axios";

export default class WorkspaceService {
  constructor() {}

  getWorkspaceByName = async (name) =>
    (await axios.get(`${backendBaseURL}/${getWorkspaceDetailsURL}/${name}`))
      .data;
}
