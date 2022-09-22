import Cookies from "universal-cookie";
const cookies = new Cookies();

const isLogin = () => {
  console.log(!!cookies.get("mycookie"));
  return !!cookies.get("mycookie");
};

export default isLogin;
