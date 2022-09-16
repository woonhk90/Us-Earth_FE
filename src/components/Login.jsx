import React from 'react';
import styled from 'styled-components';
import icons from "../assets";

const Login = () => {
  const { Kakao, Naver, Google, Seed } = icons;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY_KAKAO}&redirect_uri=${process.env.REACT_APP_REDIRECT_KAKAO}&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_REST_API_KEY_GOOGLE}&redirect_uri=${process.env.REACT_APP_REDIRECT_GOOGLE}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${process.env.REACT_APP_REST_API_KEY_NAVER}&amp;state=test&amp;redirect_uri=${process.env.REACT_APP_REDIRECT_NAVER}`;

  const onClickHandler = (flag) => {
    if (flag === 'k') { window.location.href = KAKAO_AUTH_URL; }
    else if (flag === 'n') { window.location.href = NAVER_AUTH_URL; }
    else if (flag === 'g') { window.location.href = GOOGLE_AUTH_URL; }
  }
  return (
    <>
      <LoginWrap>
        <Container>
          <Logo></Logo>
          <Seed />
          <div className='item' onClick={() => onClickHandler('k')}><Kakao />카카오 로그인</div>
          <div className='item' onClick={() => onClickHandler('n')}><Naver />네이버 로그인</div>
          <div className='item' onClick={() => onClickHandler('g')}><Google />구글 로그인</div>
        </Container>
      </LoginWrap>
    </>
  )
}
export default Login;

const LoginWrap = styled.div`
  width:100vw;
  height:100%;
  
  display:flex;
  flex-direction:column;
`;
const Logo = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height: 200px;
  width: 200px;
  background-size: 200px;
  background-repeat: no-repeat;
`;
const Container = styled.div`
  width:100vw;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:12px;
  box-sizing:border-box;
  padding:0 16px;
  .item{
    width:100%;
    padding:12px 0;
    border:1px solid black;
    text-align:center;
    font:500 18px/25px 'Noto Sans','sean-serif';
  }
`;