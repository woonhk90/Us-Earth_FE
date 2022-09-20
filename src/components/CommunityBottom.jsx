import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/cookie';
import { clearVal } from '../redux/modules/communitySlice';
import icons from '../assets';

const CommunityBottom = () => {
  const { Community_On, Community_Off, Info_On, Info_Off, Chat_On, Chat_Off, Mypage_On, Mypage_Off } = icons;
  const navigate = useNavigate();
  const usercookie = getCookie('mycookie');

  /* ------------------------------- 버튼에 불 들어오는거 ------------------------------ */
  const path = window.location.pathname;
  let pathFlag = '';
  if (path.includes('/mypage') || path.includes('/login')) {
    pathFlag = 'mypage';
  } else if (path.includes('/chat')) {
    pathFlag = 'chat';
  } else if (path.includes('/info')) {
    pathFlag = 'info';
  } else {
    pathFlag = 'root';
  }

  const onActionPage = () => {
    getCookie('mycookie') === undefined ? navigate('/login') : navigate('/mypage');
  }
  return (
    <>
      <FooterWrap>
        <FooterMenus onClick={() => { clearVal(); navigate('/') }}>{pathFlag === 'root' ? <Community_On /> : <Community_Off />}<span>커뮤니티</span></FooterMenus>
        <FooterMenus onClick={() => { navigate('/info') }}>{pathFlag === 'info' ? <Info_On /> : <Info_Off />}<span>소식지</span></FooterMenus>
        <FooterMenus >{pathFlag === 'chat' ? <Chat_On /> : <Chat_Off />}<span>채팅</span></FooterMenus>
        <FooterMenus onClick={onActionPage}>{pathFlag === 'mypage' ? <Mypage_On /> : <Mypage_Off />}<span>{usercookie === undefined ? '로그인' : '내정보'}</span></FooterMenus>
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
  box-sizing:border-box;
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