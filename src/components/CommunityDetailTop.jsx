import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../assets/LeftArrow.svg";
import { ReactComponent as UserPlus } from "../assets/UserPlus.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVal } from '../redux/modules/communitySlice';

const CommunityTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onClickHandler = () => {
    console.log("뒤로가자");
    navigate(-1);
  }
  useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, [])
  return (
    <>
      <HeaderWrap>
        <div onClick={onClickHandler}><LeftArrow /></div>
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