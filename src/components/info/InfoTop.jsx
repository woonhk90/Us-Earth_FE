import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/color';

const InfoTop = () => {
  return (
    <>
      <HeaderWrap>
        <div></div>
        <p>정보제공</p>
        <div></div>
      </HeaderWrap>
    </>
  )

}
export default InfoTop;

const HeaderWrap = styled.div`
  width:100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:10px;
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
  p{
    font-weight: 600;
    font-size: 20px;
  }
`;