import React from 'react';
import styled from 'styled-components';
import Modal from "./CommunityModal";
import { useNavigate } from "react-router-dom";
import { colors } from '../styles/color';
import icons from '../assets';

const CommunityTop = () => {
  const { Plus, Search } = icons;
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  return (
    <>
      <HeaderWrap>
        <div onClick={() => { /* navigate('/'); */ setModal(!modal); }}><Search /></div>
        {modal && (<Modal closeModal={() => setModal(!modal)}></Modal>)}
        <p>커뮤니티</p>
        <div></div>
      </HeaderWrap>
    </>
  )

}
export default CommunityTop;

const HeaderWrap = styled.div`
  width: 100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
  div{
    width:100%;
    display:flex;
    align-items:center;
  }
  p{
    width:100%;
    text-align:center;
    font-weight: 600;
    font-size: 20px;
  }
`;