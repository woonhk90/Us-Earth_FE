import React from "react";
import styled from "styled-components";

const ConfirmModal = (props) => {
  const { closeModal } = props;
  const { title, btn1 } = props.alertModalData;
  return (
    <>
      <ModalWrap onClick={props.goAction}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AttendWrap>
            <AttendTitle>{title}</AttendTitle>
            <AttendBox>
              <AttendItem onClick={props.goAction}>{btn1}</AttendItem>
            </AttendBox>
          </AttendWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default ConfirmModal;

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

const AttendWrap = styled.div``;
const AttendTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
`;
const AttendBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid #d9d9d9;
`;
const AttendItem = styled.div`
  cursor: pointer;
  width: 50%;
  font: 600 22px/30px "Noto Sans KR", "sans-serif";
  padding: 19px 0;
`;
