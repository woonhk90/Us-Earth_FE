import React from 'react';
import styled from 'styled-components';
const Header = () => {
  return (
    <>
      <HeaderWrap>
        <div>검색</div>
        <div>플러스</div>
      </HeaderWrap>
    </>
  )
}
export default Header;

const HeaderWrap = styled.div`
  width:100vw;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:15px;
  box-sizing:border-box;
`;