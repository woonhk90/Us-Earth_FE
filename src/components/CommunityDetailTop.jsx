import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../assets/LeftArrow.svg";
import { ReactComponent as UserPlus } from "../assets/UserPlus.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVal } from '../redux/modules/communitySlice';
import { colors } from '../styles/color';
import icons from '../assets';

const CommunityTop = () => {
  const { Back } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    const url = localStorage.getItem('pathname');
    localStorage.removeItem('pathname');
    if (url) {
      navigate('/');
    } else {
      navigate(-1);
    }
  }
  useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, [])
  return (
    <>
      <HeaderWrap>
        <IconDiv onClick={onClickHandler}>
          <Back />
        </IconDiv>
        <div><UserPlus /></div>
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
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;