import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styled from 'styled-components';
const Layout = (props) => {
  return (
    <LayoutWrap>
      <Header />
      {props.children}
      <Footer />
    </LayoutWrap>
  )
}
export default Layout;

const LayoutWrap = styled.div`
  width:100vw;
  height:calc(100vh - 48px * 2);
  position:relative;
`;