import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";
import { flexBetween } from "../../styles/Flex";

const ConfirmSingleModal = (props) => {
  const { clickSubmit, closeModal } = props;
  const { title, cancel, submit } = props.confirmModalData;
  
  const submitonClick = async () => {
    await clickSubmit();
    closeModal();
  };
  
  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
            <ConfirmTitle>{title}</ConfirmTitle>
            <ConfirmBox>
            <Button btnType="modal" onClick={closeModal}>
                {cancel}
              </Button>
              <Button btnType="modal" onClick={submitonClick}>
                {submit}
              </Button>
            </ConfirmBox>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default ConfirmSingleModal;

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
`;

const ModalBody = styled.div`
  width: 100%;

  background-color: #fff;
  border-radius: 12px;
`;

const ConfirmTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
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
