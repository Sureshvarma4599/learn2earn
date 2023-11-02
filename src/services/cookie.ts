import Cookies from "js-cookie";

export const getTokenFromCookie = () => {
  return Cookies.get("authToken"); // Replace 'yourAuthTokenCookieName' with the actual cookie name you're using.
};

export const getAppUserId = () => {
  return Cookies.get("appUserId");
};

export const clearAllCookies = () => {
  Cookies.remove("authToken");
  Cookies.remove("expiry");
  Cookies.remove("appUserId");
};
