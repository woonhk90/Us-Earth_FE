import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styled from 'styled-components';
const Layout = (props) => {
  return (
    <LayoutWrap>
      <HeaderBox>
        <Header />
      </HeaderBox>
      {props.children}
      <FooterBox>
        <Footer />
      </FooterBox>
    </LayoutWrap>
  )
}
export default Layout;

const LayoutWrap = styled.div`
  width:100vw;
  height:100vh;
  position:relative;
`;
const HeaderBox = styled.div`
  position:fixed;
  top:0;
  left:0;
`;
const FooterBox = styled.div`
  position:fixed;
  bottom:0;
  left:0;
`;