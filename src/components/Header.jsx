import React from 'react';
import styled from "styled-components";

const Header = (props) => {
  return <HeaderWrap>{props.children}</HeaderWrap>
}
export default Header;


const HeaderWrap = styled.div`
/* width: 100%; */
`;