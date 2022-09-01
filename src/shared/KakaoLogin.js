import React, { useEffect } from 'react';
import axios from 'axios';
const Login = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const getKakaoToken = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_API}?code=${code}`);
      console.log('로그인리턴=>', data);
      // navigator('/');
    } catch (error) {
      window.alert("오류났어요");
      console.log(error);
    }
  }

  useEffect(() => {
    getKakaoToken();
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}
export default Login;