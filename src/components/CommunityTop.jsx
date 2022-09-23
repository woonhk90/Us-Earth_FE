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
        <div onClick={() => { setModal(!modal) }}><Search /></div>
        <div onClick={() => { navigate('/community/form') }}><Plus /></div>
        {modal && (<Modal closeModal={() => setModal(!modal)}></Modal>)}
      </HeaderWrap>
    </>
  )

}
export default CommunityTop;

const HeaderWrap = styled.div`
/* position: absolute; */
  top:0;
  left:0;
  width: 100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22}
`;