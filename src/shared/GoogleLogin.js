import React, { useEffect } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';

const Login = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const getKakaoToken = async () => {
    try {
      // const data = await axios.get(`${process.env.GOOGLE_BASE_URL}?code=${code}`);
      const data = await axios.get(`http://13.209.97.209/user/google/callback?code=${code}`);
      console.log('로그인리턴=>', data);

      Swal.fire({
        title: '환영합니다.!',
        icon: 'success',
        confirmButtonText: '확인',
      })

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