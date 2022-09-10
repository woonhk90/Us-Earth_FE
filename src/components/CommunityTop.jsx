import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Plus } from "../assets/Plus.svg";
import { ReactComponent as Search } from "../assets/Search.svg";
import Modal from "./CommunityModal";
import { useNavigate } from "react-router-dom";

const CommunityTop = () => {
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