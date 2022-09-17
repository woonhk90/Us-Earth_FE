import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearVal } from '../../redux/modules/communitySlice';
import { colors } from '../../styles/color';

const CommunityTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, [])
  const onClickHandler = () => {
    navigate(-1);
  }
  return (
    <>
      <HeaderWrap>
        <div></div>
        <p>내정보</p>
        <div onClick={() => { navigate('/mypage/setting') }}><Setting /></div>
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
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22}
`;