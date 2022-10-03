import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Question } from "../../assets/question.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVal } from "../../redux/modules/communitySlice";
import topLogo from "../../assets/logo/topLogo.png";
import GuideSingleModal from "../Modals/GuideSingleModal";

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
          <IconRight
            onClick={() => {
              setDelModal(!delModal);
            }}
          >
            <Question />
          </IconRight>
          <IconRight
            onClick={() => {
              navigate("/mypage/setting");
            }}
          >
            <Setting />
          </IconRight>
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
const P = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const IconRight = styled.div`
  cursor: pointer;
  width: 28px;
  height: 29px;
`;

const Image = styled.img`
  width: 132px;

  @media (max-width: 325px) {
    width: 100px;
  }
`;
