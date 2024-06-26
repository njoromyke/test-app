import axios, { AxiosResponse } from "axios";
import { config } from "./config";

const url = config.API_URL;

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

type PostDataRequest = {
  [key: string]: any;
};

type PostDataResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const postData = async (endpoint: string, data: PostDataRequest): Promise<PostDataResponse> => {
  try {
    console.log(data, endpoint);
    const response: AxiosResponse<any> = await api.post(endpoint, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error posting data:", error);
    return { success: false, error: error.message };
  }
};
