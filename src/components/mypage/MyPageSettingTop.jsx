import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../styles/color';
import icons from '../../assets';
import Button from '../elements/Button';

const CommunityTop = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(-1);
  }
  return (
    <>
      <HeaderWrap>
        <Button btnType="svg" svgType="back" onClick={onClickHandler}/>
        <p>설정</p>
      </HeaderWrap>
    </>
  )

}
export default CommunityTop;

const HeaderWrap = styled.div`
  width:100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px;
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
  p:nth-child(2){
    font-weight: 600;
    font-size: 20px;
    letter-spacing: -0.02em;
    text-align:center;
  }
`;
const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;