import axios from "axios";
import Cookies from "js-cookie";
import { getTokenFromCookie, getAppUserId } from "./cookie";

export type User = {
  email?: String;
  password?: String;
  firstName?: String;
  lastName?: String;
};

const baseUrl: string = "http://localhost:1221";

const path = () => {
  return {
    signUp: "/api/v1/signup",
    login: "/api/v1/login",
    users: "/api/v1/users",
    auth: "/api/v1/auth",
    updateRole: "/api/v1/update/role",
  };
};

const api = axios.create({
  baseURL: baseUrl, // Replace with your API endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const userLogin = async (body: User) => {
  return await axios.post(baseUrl + path().login, body).then((res: any) => {
    return res.data;
  });
};

export const createUser = async (body: User) => {
  return await axios
    .post(baseUrl + path().signUp, body)
    .then((res: any) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getUserAuth = async (headers: any) => {
  return await axios
    .get(baseUrl + path().auth, { headers })
    .then((res: any) => {
      return res?.data;
    });
};

export const getUsersList = async () => {
  const userId = getAppUserId();
  return api.get(path().users + "/" + userId).then((res) => res.data);
};

export const updateUserRole = async (role: string) => {
  const userId = getAppUserId();
  return api
    .post(path().updateRole + "/" + userId, { role })
    .then((res) => res.data);
};
