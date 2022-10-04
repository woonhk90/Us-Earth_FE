import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVal } from "../../redux/modules/communitySlice";
import topLogo from "../../assets/logo/topLogo.png";
import GuideSingleModal from "../Modals/GuideSingleModal";
import Button from "../elements/Button";

const CommunityTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [delModal, setDelModal] = useState(false);

  // close Modal
  const closeModal = () => {
    setDelModal(!delModal);
  };

  useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, []);
  
  return (
    <>
      {delModal && <GuideSingleModal page={5} closeModal={closeModal}></GuideSingleModal>}
      <HeaderWrap>
        <HeaderCenter 
            onClick={() => {
              navigate("/");
            }}>
          <Image src={topLogo} alt="topLogo"></Image>
        </HeaderCenter>
        <HeaderRight>
          <Button
          btnType="svg"
          svgType="question"
            onClick={() => {
              setDelModal(!delModal);
            }}
          >
          </Button>
          <Button
          btnType="svg"
          svgType="setting"
            onClick={() => {
              navigate("/mypage/setting");
            }}
          >
          </Button>
        </HeaderRight>
      </HeaderWrap>
    </>
  );
};
export default CommunityTop;

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
  justify-content: right;
  align-items: center;
`;

const HeaderRight = styled.div`
  gap: 12px;
  display: flex;
  padding: 10px 17px;
  box-sizing: border-box;
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
