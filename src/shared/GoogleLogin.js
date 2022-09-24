import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { setCookie } from "./cookie";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/Modals/AlertModal";
import ErrorModal from "../components/Modals/ErrorModal";
import { useState } from "react";

const Login = () => {
  const [modal, setModal] = React.useState(false);
  const [error, setError] = useState("");

  const alertModalData = {
    title: "환영합니다",
    btn1: "확인",
  };
  const modalOnOff = () => {
    setModal(!modal);
  };
  const goAction = () => {
    /* 값이 있으면 그 값으로 페이지 이동 없으면 -1(뒤로가기) */
    const pathname = localStorage.getItem("pathname");
    localStorage.removeItem("pathname");
    pathname ? navigate(pathname, { replace: true }) : navigate("/mypage", { replace: true });
  };

  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const getGoogleToken = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER_API_GOOGLE}?code=${code}`);
      console.log("로그인리턴=>", data);

      if (await data.headers.authorization) {
        setCookie("mycookie", data.headers.authorization);
        setCookie("refreshToken", data.headers.refreshtoken);
      }

      modalOnOff();
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getGoogleToken();
  }, []);

  // if (error) return <ErrorModal error="로그인 실패" />;

  return (
    <>
      <Layout>
        {error && <ErrorModal error="로그인 실패" navigation="/login"/>}
        
        <CommunityBox>{modal && <AlertModal alertModalData={alertModalData} closeModal={modalOnOff} goAction={goAction}></AlertModal>}</CommunityBox>
      </Layout>
    </>
  );
};
export default Login;

const CommunityBox = styled.div`
  height: 100%;
  width: 390px;
  overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
