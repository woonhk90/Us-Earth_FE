import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
              <AttendBox>
                <AttendItem onClick={okModalOnOff}>확인</AttendItem>
              </AttendBox>
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
