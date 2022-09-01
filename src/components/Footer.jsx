import React from 'react';
import styled from 'styled-components';
const Footer = () => {
  return (
    <>
      <FooterWrap>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'}>커뮤니티</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'}>정보제공</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.2)'}>채팅</FooterMenus>
        <FooterMenus bgColor={'rgba(0,0,0,0.4)'}>내정보</FooterMenus>
      </FooterWrap>
    </>
  )
}
export default Footer;

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