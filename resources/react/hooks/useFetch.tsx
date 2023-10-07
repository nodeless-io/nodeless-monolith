import axios from "axios";
import { APP_ROUTES } from "../pages/app.routes";

const csrf = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

const requestHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-CSRF-TOKEN": csrf,
};

export async function useFetch(
  endpoint: string,
  payload: any = null,
  method: string = "GET"
) {
  const response = await axios({
    method: method,
    url: endpoint,
    data: payload,
    headers: requestHeaders,
  });

  if (response?.status == 401) {
    window.location.href = APP_ROUTES.LOGIN;
  }

  return response.data;
}

export const useFetchWithFile = async (
  endpoint: string,
  payload: any,
  method: string = "POST"
) => {
  const response = await axios({
    method: method,
    url: endpoint,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      "X-CSRF-TOKEN": csrf,
    },
  });

  return response.data;
};
