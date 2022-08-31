import React, { useEffect } from 'react';
import axios from 'axios';
const Login = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
  const getKakaoToken = async () => {
    try {
      // const data = await axios.get(`${process.env.NAVER_REACT_APP_SERVER_API}?code=${code}`);
      const data = await axios.get(`http://13.209.97.209/user/naver/callback?code=${code}&state=${state}`);
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