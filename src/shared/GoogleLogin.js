import React, { useEffect } from 'react';
import axios from 'axios';
import { setCookie } from "./cookie";
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const getGoogleToken = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_API_GOOGLE}?code=${code}`);
      console.log('로그인리턴=>', data);

      (await data.headers.authorization) && setCookie("mycookie", data.headers.authorization);

      await Swal.fire({
        title: '환영합니다',
        icon: 'success',
        confirmButtonText: '확인',
      })

      /* ----------------------- 어디에서 로그인을 했는지 그 위치로 다시 이동함 ----------------------- */
      const pathname = localStorage.getItem('pathname');
      localStorage.removeItem('pathname');
      pathname ? navigate(pathname) : navigate('/login');
      // navigate('/Community');
    } catch (error) {
      window.alert("오류났어요");
      console.log(error);
    }
  }
  useEffect(() => {
    getGoogleToken();
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}
export default Login;