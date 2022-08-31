import React from 'react';
import styled from 'styled-components';
const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT}&response_type=code`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=877084231575-p8uv6t4s185vln40vhsdab86gnviqurq.apps.googleusercontent.com&redirect_uri=http://localhost:3000/user/google/callback&response_type=code&scope=email%20profile%20openid&access_type=offline`;
  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=${process.env.NAVER_REACT_APP_REST_API_KEY}&amp;state=test&amp;redirect_uri=${process.env.NAVER_REACT_APP_REDIRECT}`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=x9CzwP1GNJaDfiviBzQp&amp;state=test&amp;redirect_uri=http://localhost:3000/user/naver/callback`;

  const onClickHandler = (flag) => {
    if (flag === 'k') { window.location.href = KAKAO_AUTH_URL; }
    else if (flag === 'n') { window.location.href = NAVER_AUTH_URL; }
    else if (flag === 'g') { window.location.href = GOOGLE_AUTH_URL; }
  }
  return (
    <>
      <LoginWrap>
        로그인페이지
        <button onClick={() => onClickHandler('k')}>카카오 로그인</button>
        <button onClick={() => onClickHandler('n')}>네이버 로그인</button>
        <button onClick={() => onClickHandler('g')}>구글 로그인</button>
      </LoginWrap>
    </>
  )
}
export default Login;

const LoginWrap = styled.div`
width:100vw;
height:100vh;
background-color:pink;
`;