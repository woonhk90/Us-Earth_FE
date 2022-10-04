import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Button from "../elements/Button";
import { flexBetween } from "../../styles/Flex";

const GuideModal = (props) => {
  const { closeModal, totalPage } = props;
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
                <Button btnType="svg" svgType="cancel" />
              </IconDiv>
              <Image src={require(`../../assets/jpg/guide${imgNumber}.jpg`)} alt={`guide${imgNumber}`}></Image>
            </ConfirmTitle>
            <ConfirmBox>
              <Button btnType="modal" on="on" onClick={preClick}>
                {imgNumber === 1 ? "닫기" : "이전"}
              </Button>
              <Button btnType="modal" onClick={nextClick}>
                {imgNumber === totalPage ? "닫기" : "다음"}
              </Button>
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
  position: absolute;
  right: 19px;
  top: -4px;
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
  ${flexBetween}
  button:nth-child(1) {
    border-right: 1px solid rgba(217, 217, 217, 0.3);
  }
  button:nth-child(2) {
    border-left: 1px solid rgba(217, 217, 217, 0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
