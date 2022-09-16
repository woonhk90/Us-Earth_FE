import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../shared/cookie';
import { useDispatch } from "react-redux";
import { clearVal } from '../redux/modules/communitySlice';
import icons from '../assets';

const CommunityBottom = () => {
  const { Community_On, Community_Off, Info_On, Info_Off, Chat_On, Chat_Off, Mypage_On, Mypage_Off } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usercookie = getCookie('mycookie');
  const { pathname } = useLocation();

  const cookieCheck = (page) => {
    if (page === '/') {
      if (pathname !== page) {
        dispatch(clearVal());
      }
      navigate('/');
    } else {
      if (usercookie === undefined) {
        localStorage.setItem('pathname', page);
        navigate('/login');
      } else {
        navigate(page);
      }
    }
  }

  const path = window.location.pathname;
  let pathFlag = '';
  if (path.includes('/mypage')) {
    pathFlag = 'mypage';
  } else if (path.includes('/chat')) {
    pathFlag = 'chat';
  } else if (path.includes('/info')) {
    pathFlag = 'info';
  } else {
    pathFlag = 'root';
  }

  return (
    <>
      <FooterWrap>
        <FooterMenus onClick={() => { cookieCheck('/') }}>{pathFlag === 'root' ? <Community_On width='25' /> : <Community_Off width='25' />}<span>커뮤니티</span></FooterMenus>
        <FooterMenus onClick={() => { navigate('/info') }}>{pathFlag === 'info' ? <Info_On width='25' /> : <Info_Off width='25' />}<span>소식지</span></FooterMenus>
        <FooterMenus >{pathFlag === 'chat' ? <Chat_On width='25' /> : <Chat_Off width='25' />}<span>채팅</span></FooterMenus>
        <FooterMenus onClick={() => { cookieCheck('/mypage') }}>{pathFlag === 'mypage' ? <Mypage_On width='25' /> : <Mypage_Off width='25' />}<span>내정보</span></FooterMenus>
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
  height:62px;
  display:flex;
  text-align:center;
  border-top:1px solid #F5F5F5;
`;

const FooterMenus = styled.div`
  width:100%;
  
  
  /* background-color:${(props) => props.bgColor}; */
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  span{
    font-size:10px;
    line-height:20px;
  }
`;