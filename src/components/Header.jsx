import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Plus } from "../assets/Plus.svg";
import { ReactComponent as Search } from "../assets/Search.svg";
const Header = () => {
  return (
    <>
      <HeaderWrap>
        <div><Search /></div>
        <div><Plus /></div>
      </HeaderWrap>
    </>
  )
}
export default Header;

const HeaderWrap = styled.div`
  position:fixed;
  top:0;
  left:0;

  width:100vw;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:10px;
  box-sizing:border-box;
`;