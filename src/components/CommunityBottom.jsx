import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../shared/cookie';
import { useDispatch } from "react-redux";
import { clearVal } from '../redux/modules/communitySlice';

const CommunityBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usercookie = getCookie('mycookie');
  const { pathname } = useLocation();
  console.log("쿠키확인", usercookie);
  const onClickHandler = (flag) => {
    /* --------------------- 로그인 되어있는지 우선 확인(안되어있으면 로그인페이지) --------------------- */
    if (usercookie === undefined) {
      localStorage.setItem('pathname', pathname);
      navigate('/login');
    } else {
      navigate(`/${flag}`);
    }
  }
  const cookieCheck = (page) => {
    if (page === '/') {
      if(pathname!==page){
        dispatch(clearVal());
      }
      navigate('/');
    } else {
      if (usercookie === undefined) {
        navigate('/login');
      } else {
        navigate(page);
      }
    }
  }



  return (
    <>
      <FooterWrap>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'} onClick={() => { cookieCheck('/') }}>커뮤니티</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'}>정보제공</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'}>채팅</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'} onClick={() => { cookieCheck('/mypage') }}>내정보</FooterMenus>
      </FooterWrap>
    </>
  )

}
export default CommunityBottom;

const FooterWrap = styled.div`
  position:fixed;
  bottom:0;
  left:0;

  width:100%;
  display:flex;
  text-align:center;
`;

const FooterMenus = styled.div`
  width:100%;
  line-height:48px;
  background-color:${(props) => props.bgColor};
`;