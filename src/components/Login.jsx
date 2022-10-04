import React from "react";
import styled from "styled-components";
import icons from "../assets";
import LogoImg from "../assets/logo.png";
import kakao from "../assets/logo_kakao.png";
import naver from "../assets/logo_naver.png";
import google from "../assets/logo_google.png";
import Button from "./elements/Button";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO}&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_REST_API_KEY_GOOGLE}&redirect_uri=${process.env.REACT_APP_REDIRECT_GOOGLE}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${process.env.REACT_APP_REST_API_KEY_NAVER}&amp;state=test&amp;redirect_uri=${process.env.REACT_APP_REDIRECT_NAVER}`;

  const onClickHandler = (flag) => {
    if (flag === "k") {
      window.location.href = KAKAO_AUTH_URL;
    } else if (flag === "n") {
      window.location.href = NAVER_AUTH_URL;
    } else if (flag === "g") {
      window.location.href = GOOGLE_AUTH_URL;
    }
  };
  return (
    <>
      <LoginWrap>
        <Container>
          <Logo></Logo>
          <Button btnType="login" onClick={() => onClickHandler("k")}>
            <div>
              <img src={kakao} alt="kakao_img" />
            </div>
            <LoginText>카카오 로그인</LoginText>
          </Button>
          <Button btnType="login" onClick={() => onClickHandler("n")}>
            <div>
              <img src={naver} alt="naver_img" />
            </div>
            <LoginText>네이버 로그인</LoginText>
          </Button>
          <Button btnType="login" onClick={() => onClickHandler("g")}>
            <div>
              <img src={google} alt="google_img" />
            </div>
            <LoginText>구글 로그인</LoginText>
          </Button>
        </Container>
      </LoginWrap>
    </>
  );
};
export default Login;

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 210px;
  height: 130px;
  margin-bottom: 100px;

  background: url(${LogoImg}) no-repeat center center;
  background-size: contain;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  box-sizing: border-box;
  padding: 0 20px;
  text-align: center;
`;

const LoginText = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.03em;

  color: #424242;
`;
