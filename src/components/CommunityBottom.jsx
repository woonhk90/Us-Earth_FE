import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CommunityBottom = () => {
  const navigate = useNavigate();
  const onClickHandler = (flag) => {
    navigate(`/${flag}`);
  }
  return (
    <>
      <FooterWrap>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'} onClick={() => { onClickHandler('community') }}>커뮤니티</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'}>정보제공</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'}>채팅</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'} onClick={() => { onClickHandler('mypage') }}>내정보</FooterMenus>
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