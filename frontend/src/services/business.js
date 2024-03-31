import {
  backendBaseURL,
  getBusinessProfileURL,
  registerBusinessURL,
} from "@/constants";
import axios from "axios";

export default class BusinessService {
  constructor() {}

  registerBusiness = async (payload) =>
    (await axios.post(`${backendBaseURL}/${registerBusinessURL}`, payload))
      .data;

  getProfile = async (username) =>
    (await axios.get(`${backendBaseURL}/${getBusinessProfileURL}/${username}`))
      .data;
}
