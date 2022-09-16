import React from 'react';
import styled from 'styled-components';
const Layout = (props) => {
  return (
    <LayoutWrap>
      {props.children}
    </LayoutWrap>
  )
}
export default Layout;

const LayoutWrap = styled.div`
  width:100vw;
  height:calc(100vh - 48px - 62px);
  position:relative;
`;