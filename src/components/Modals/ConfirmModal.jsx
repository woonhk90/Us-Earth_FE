import React from "react";
import styled from "styled-components";
import { flexBetween } from "../../styles/Flex";
import Button from "../elements/Button";

const ConfirmModal = (props) => {
  const { clickSubmit, closeModal } = props;
  const { title, cancel, submit, submitReturn } = props.confirmModalData;

  const submitonClick = () => {
    clickSubmit();
    setViewFlag(!viewFlag);
  };
  
  /* ---------------------------------- 2차 모달 ---------------------------------- */
  const [viewFlag, setViewFlag] = React.useState(false);
  
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
              <Button btnType="modal" onClick={closeModal}>
                {cancel}
              </Button>
              <Button btnType="modal" onClick={submitonClick}>
                {submit}
              </Button>
            </ConfirmBox>
          </ConfirmWrap>
          <AttendWrap viewFlag={viewFlag}>
            <AttendTitle>{submitReturn}</AttendTitle>
              <Button btnType="modal"  onClick={closeModal}>확인</Button>
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

const ConfirmBox = styled.div`
${flexBetween}
button:nth-child(1) {
  border-right: 1px solid rgba(217, 217, 217, 0.3);
}
button:nth-child(2) {
  border-left: 1px solid rgba(217, 217, 217, 0.3);
}
`;

const AttendWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "none" : "block")};
`;

const AttendTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
`;
