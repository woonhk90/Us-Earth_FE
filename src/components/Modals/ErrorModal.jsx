import Cookies from "universal-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import OkModal from "./OkModal";
import styled, { css } from "styled-components";
import Layout from "../layout/Layout";
const cookies = new Cookies();

const ErrorModal = ({ error, notGo }) => {
  const [okModal, setOkModal] = useState(true);
  const navigate = useNavigate();

  const okModalOnOff = () => {
    if (notGo) {
      setOkModal(false);
    } else {
      setOkModal(false);
      navigate("/");
    }
  };

  return (
    <>
      {okModal && <OkModal title={error} modalOnOff={okModalOnOff}></OkModal>}

      {/* <ModalWrap onClick={okModalOnOff}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AttendWrap >
            <AttendTitle>{error}</AttendTitle>
            <AttendBox>
              <AttendItem onClick={okModalOnOff}>확인</AttendItem>
            </AttendBox>
          </AttendWrap>
        </ModalBody>
      </ModalWrap> */}
    </>
  );
};

export default ErrorModal;

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
