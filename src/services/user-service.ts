import axios from "axios";
import { useCookies, Cookies } from "react-cookie";
const baseUrl: string = "http://localhost:1221";

const path = () => {
  return {
    signUp: "/api/v1/signup",
    login: "/api/v1/login",
    users: "/api/v1/users",
    auth: "/api/v1/auth",
  };
};

const getCookies = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie contains the name we are looking for
    if (cookie.startsWith("authToken" + "=")) {
      // Get the value of the cookie and decode it
      const cookieValue = decodeURIComponent(cookie.substring(10));
      return cookieValue;
    }
    return null;
  }
};

const getHeaders = () => {
  const token = getCookies();
  return {
    Authorization: `Bearer ${token}`,
  };
};
export type User = {
  email?: String;
  password?: String;
  firstName?: String;
  lastName?: String;
};
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
  const headers = await getHeaders();
  return await axios
    .get(baseUrl + path().users, { headers })
    .then((res: any) => {
      return res?.data;
    });
};
