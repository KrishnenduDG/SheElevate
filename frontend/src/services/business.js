import { backendBaseURL, registerBusinessURL } from "@/constants";
import axios from "axios";

export default class BusinessService {
  constructor() {}

  registerBusiness = async (payload) =>
    axios.post(`${backendBaseURL}/${registerBusinessURL}`, payload);
}
