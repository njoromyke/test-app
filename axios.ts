import axios, { AxiosResponse } from "axios";
import { config } from "./config";

const api = axios.create({
  baseURL: config.API_URL,
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
    const response: AxiosResponse<any> = await api.post(endpoint, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error posting data:", error);
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
};
