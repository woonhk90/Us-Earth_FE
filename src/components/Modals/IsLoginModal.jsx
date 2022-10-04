import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

const IsLoginModal = () => {
  const [okModal, setOkModal] = useState(false);
  const navigate = useNavigate();

  const okModalOnOff = () => {
    setOkModal(!okModal);
    navigate("/login");
  };

  return (
    <>
      <Background>
        <ModalWrap onClick={okModalOnOff}>
          <ModalBody
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AttendWrap>
              <AttendTitle>
                로그인이 필요합니다.
                <br /> 로그인 창으로 이동합니다.
              </AttendTitle>
                <Button btnType="modal" onClick={okModalOnOff}>확인</Button>
            </AttendWrap>
          </ModalBody>
        </ModalWrap>
      </Background>
    </>
  );
};

export default IsLoginModal;

const Background = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

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

const AttendWrap = styled.div`
  display: "block";
`;

const AttendTitle = styled.p`
  font-size: 22px;
  text-align: center;
  padding: 50px 10px;
`;
