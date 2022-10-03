import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Cancel } from "../../assets/Cancel.svg";
import { useState } from "react";

const GuideModal = (props) => {
  const { closeModal,totalPage } = props;
  const [imgNumber, setImgNumber] = useState(1);
  
  const nextClick = () => {
    if (imgNumber < totalPage) {
      setImgNumber(imgNumber + 1);
    } else closeModal();
  };
  const preClick = () => {
    if (imgNumber > 1) {
      setImgNumber(imgNumber - 1);
    } else closeModal();
  };

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
              <Image src={require(`../../assets/jpg/guide${imgNumber}.jpg`)} alt={`guide${imgNumber}`}></Image>
            </ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem color={"#B9B9B9"} onClick={preClick}>
                {imgNumber === 1 ? "닫기" : "이전"}
              </ConfirmItem>
              <ConfirmItem onClick={nextClick}>{imgNumber === totalPage ? "닫기" : "다음"}</ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default GuideModal;

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
  padding: 0 15px;
  box-sizing: border-box;
  @media (max-height: 720px) and (min-width: 389px) {
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
  div:nth-child(1) {
    border-right: 2px solid rgba(217, 217, 217, 0.3);
  }
`;
const ConfirmItem = styled.div`
  cursor: pointer;
  width: 50%;
  padding: 17px 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.color ? props.color : "#212121")};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
