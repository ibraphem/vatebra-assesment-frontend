import { BASE_URL } from "../config/settings";
import httpRequest from "../utils/httpRequest";


export const saveTask = async (payload) => {
    return await httpRequest(`${BASE_URL}/task`, 'post', payload)
  };