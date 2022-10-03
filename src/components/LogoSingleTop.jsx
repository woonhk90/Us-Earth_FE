import React from 'react';
import styled from 'styled-components';
import Modal from "./CommunityModal";
import { useNavigate } from "react-router-dom";
import topLogo from "../assets/jpg/topLogo.png";

const LogoSingleTop = () => {
  const navigate = useNavigate();
  // const [modal, setModal] = React.useState(false);
  return (
    <>
      <HeaderWrap>
        {/* {modal && (<Modal closeModal={() => setModal(!modal)}></Modal>)} */}
        <HeaderCenter 
            onClick={() => {
              navigate("/");
            }}>
          <Image src={topLogo} alt="topLogo"></Image>
          </HeaderCenter>
      </HeaderWrap>
    </>
  )

}
export default LogoSingleTop;

const HeaderWrap = styled.div`
position: relative;
top: 0;
left: 0;
width: 100%;
height: 48px;
box-sizing: border-box;
margin: auto;
text-align: center;
border-bottom: 1px solid #f5f5f5;
display: flex;
justify-content: center;
align-items: center;
`;
const HeaderCenter = styled.div`
cursor: pointer;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  width: 132px;
  @media (max-width: 325px) {
    width: 100px;
  }
`;
