import React, { useEffect } from 'react';
import axios from 'axios';
import { setCookie } from "./cookie";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/Modals/AlertModal";


const Login = () => {
  const [modal, setModal] = React.useState(false);
  const alertModalData = {
    title: "환영합니다",
    btn1: "확인",
  };
  const modalOnOff = () => {
    setModal(!modal);
  };
  const goAction = () => {
    /* ----------------------- 어디에서 로그인을 했는지 그 위치로 다시 이동함 ----------------------- */
    const pathname = localStorage.getItem('pathname');
    localStorage.removeItem('pathname');
    pathname ? navigate(pathname,{replace:true}) : navigate('/mypage',{replace:true});
  }

  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const getKakaoToken = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_API_KAKAO}?code=${code}`);
      console.log('로그인리턴=>', data);

      if(await data.headers.authorization){
        setCookie("mycookie", data.headers.authorization);
        setCookie("refreshToken", data.headers.refreshtoken);
      }

      modalOnOff();

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
      <div>{modal && <AlertModal alertModalData={alertModalData} closeModal={modalOnOff} goAction={goAction}></AlertModal>}</div>
    </>
  )
}
export default Login;