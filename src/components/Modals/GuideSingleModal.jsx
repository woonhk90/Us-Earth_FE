import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import guide5 from "../../assets/jpg/guide5.jpg";
import { ReactComponent as Cancel } from "../../assets/Cancel.svg";

const GuideSingleModal = (props) => {
  const { closeModal,page } = props;

  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmWrap>
            <ConfirmTitle>
              <IconDiv onClick={closeModal}>
                <Cancel />
              </IconDiv>
              <Image src={require(`../../assets/jpg/guide${page}.jpg`)} alt={`guide${page}`}></Image>
            </ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem onClick={closeModal}>
               확인
              </ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default GuideSingleModal;

const ModalWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 16px;
  box-sizing: border-box;
  @media (max-height: 720px) and (min-width:389px){
  padding: 0 55px;
    }
`;
const ModalBody = styled.div`
  width: 100%;

  background-color: #fff;
  border-radius: 12px;
`;

const IconDiv = styled.div`
  /* margin-left: 12px; */
  position: absolute;
  right: 19px;
  top: -4px;
  cursor: pointer;
  width: 21px;
  height: 21px;
`;
const ConfirmWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "block" : "none")};
`;
const ConfirmTitle = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;
const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 2px solid rgba(217, 217, 217, 0.3);
`;
const ConfirmItem = styled.div`
cursor: pointer;
  width: 100%;
  padding: 17px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;

  color:#212121;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
