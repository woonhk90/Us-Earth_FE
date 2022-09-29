import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const ConfirmModal = (props) => {
  const { clickSubmit, closeModal } = props;
  const { title, cancel, submit, submitReturn } = props.confirmModalData;

  /* ---------------------------------- 2차 모달 ---------------------------------- */
  const [viewFlag, setViewFlag] = React.useState(false);
  const submitonClick = (id) => {
    clickSubmit();
    setViewFlag(!viewFlag);
  };
  
  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmWrap >
            <ConfirmTitle>{title}</ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem borderRight={"1px solid #d9d9d9"} onClick={closeModal}>
                {cancel}
              </ConfirmItem>
              <ConfirmItem borderLeft={"1px solid #d9d9d9"} onClick={submitonClick}>
                {submit}
              </ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
          <AttendWrap viewFlag={viewFlag}>
            <AttendTitle>{submitReturn}</AttendTitle>
            <AttendBox>
              <AttendItem onClick={closeModal}>확인</AttendItem>
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

const ConfirmWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "block" : "none")};
`;
const ConfirmTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
`;
const ConfirmTitleSpan = styled.span`
  font: 700 22px/30px "Noto Sans KR", "sans-serif";
`;
const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid #d9d9d9;
`;
const ConfirmItem = styled.div`
  width: 50%;
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  font: 600 22px/30px "Noto Sans KR", "sans-serif";
  padding: 19px 0;
`;

const AttendWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "none" : "block")};
`;
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
  width: 50%;
  font: 600 22px/30px "Noto Sans KR", "sans-serif";
  padding: 19px 0;
`;
