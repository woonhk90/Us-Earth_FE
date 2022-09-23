import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import icons from '../../assets';
import { colors } from '../../styles/color';

const MyPageMissionGroupTop = () => {
  const { LeftArrow } = icons;
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(-1);
  }
  return (
    <>
      <HeaderWrap>
        <div onClick={() => onClickHandler()}><LeftArrow /></div>
        <p>그룹 미션</p>
        <div></div>
      </HeaderWrap>
    </>
  );
}
export default MyPageMissionGroupTop;
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
`;