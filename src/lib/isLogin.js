import Cookies from "universal-cookie";
const cookies = new Cookies();

const isLogin = () => {
  return !!cookies.get("mycookie");
};

export default isLogin;
