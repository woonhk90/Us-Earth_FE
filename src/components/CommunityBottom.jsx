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

  const onActionPage = (val) => {
    const path = window.location.pathname;
    if (val === 'btn1') {
      clearVal();
      path === '/' ? window.location.reload() : navigate('/');
    } else if (val === 'btn2') {
      path === '/info' ? window.location.reload() : navigate('/info');
    } else if (val === 'btn3') {
    } else if (val === 'btn4') {
      if (getCookie('mycookie') === undefined) {
        navigate('/login')
      } else {
        if (path === '/mypage' || path === '/login') {
          window.location.reload();
        } else {
          navigate('/mypage');
        }
      }
    }
  }
  return (
    <>
      <FooterWrap>
        <FooterMenus onClick={() => { onActionPage('btn1') }} style={{color: pathFlag === 'root' ? '#94DA76' : '#DDDDDD'}}>{pathFlag === 'root' ? <Community_On /> : <Community_Off />}<span>커뮤니티</span></FooterMenus>
        <FooterMenus onClick={() => { onActionPage('btn2') }} style={{color: pathFlag === 'info' ? '#94DA76' : '#DDDDDD'}}>{pathFlag === 'info' ? <Info_On /> : <Info_Off />}<span>소식지</span></FooterMenus>
        <FooterMenus  style={{color: pathFlag === 'chat' ? '#94DA76' : '#DDDDDD'}}>{pathFlag === 'chat' ? <Chat_On /> : <Chat_Off />}<span>채팅</span></FooterMenus>
        <FooterMenus onClick={() => { onActionPage('btn4') }} style={{color: pathFlag === 'mypage' ? '#94DA76' : '#DDDDDD'}}>{pathFlag === 'mypage' ? <Mypage_On /> : <Mypage_Off />}<span>{usercookie === undefined ? '로그인' : '내정보'}</span></FooterMenus>
      </FooterWrap>
    </>
  )

}
export default CommunityBottom;

const FooterWrap = styled.div`
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
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  color:${(props)=>props.color};
  span{
    font-size:10px;
    line-height:20px;
  }
`;