import React, { useEffect } from 'react';
import axios from 'axios';
import { setCookie } from "./cookie";
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

// const getGoogleToken = async (code) => {
//   console.log("코드2=>", code);
//   const data = await axios.get(`http://13.209.97.209/user/google/callback?code=${code}`);
//   (data.headers.authorization) && setCookie("mycookie", data.headers.authorization);
//   return data;
// }

const Login = () => {

  // let code = new URL(window.location.href).searchParams.get("code");
  // const getToken = useQuery("getToken", getGoogleToken(code), {
  //   onSuccess: (data) => {
  //     console.log('성공=>', data);
  //   },
  //   onError: (data) => {
  //     console.log("실패=>", data);
  //   }
  // });

  // if (getToken.isLoading) {
  //   return null;
  // }
  // console.log(getToken);
  // console.log(getToken.data);















  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const getGoogleToken = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_API_GOOGLE}?code=${code}`);
      console.log('로그인리턴=>', data);

      (await data.headers.authorization) && setCookie("mycookie", data.headers.authorization);

      await Swal.fire({
        title: '환영합니다.!',
        icon: 'success',
        confirmButtonText: '확인',
      })

      navigate('/Community');
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