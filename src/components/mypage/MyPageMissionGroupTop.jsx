import React from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import icons from '../../assets';

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
  position:fixed;
  top:0;
  left:0;

  width:100vw;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:10px;
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
`;