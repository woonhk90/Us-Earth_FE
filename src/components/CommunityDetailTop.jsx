import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../assets/LeftArrow.svg";
import { ReactComponent as UserPlus } from "../assets/UserPlus.svg";

const CommunityTop = () => {
  return (
    <>
      <HeaderWrap>
        <div><LeftArrow /></div>
        <div><UserPlus /></div>
      </HeaderWrap>
    </>
  )

}
export default CommunityTop;

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
  z-index:1;
`;