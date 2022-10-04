import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import { flexBetween } from "../../styles/Flex";

const ConfirmModal = (props) => {
  const { modalOnOff } = props;
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const clickSubmit = () => {
    localStorage.setItem("pathname", pathname);
    navigate("/login");
  };

  return (
    <>
      <ModalWrap onClick={modalOnOff}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmTitle>
            로그인이 필요합니다.
            <br /> 로그인 페이지로 이동하시겠습니까?
          </ConfirmTitle>
          <ConfirmBox>
            <Button btnType="modal" onClick={modalOnOff}>
              취소
            </Button>
            <Button btnType="modal" onClick={clickSubmit}>
              확인
            </Button>
          </ConfirmBox>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default ConfirmModal;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
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
  font-size: 22px;
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
