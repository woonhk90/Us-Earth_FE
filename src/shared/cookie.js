// import { Cookies } from "react-cookie";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookie = (name) => cookies.get(name);
export const setCookie = (name, value) =>
  cookies.set(name, value, {
    path: "/",
  });
export const setCookieTimeZero = (name, value) =>
  cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + 10000),
  });

export const removeCookie = (name) =>
  cookies.remove(name, { path: "/" });
export const returnRemoveCookie = (name) => {
  return cookies.remove(name);
}