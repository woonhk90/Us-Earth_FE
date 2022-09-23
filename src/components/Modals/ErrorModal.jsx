import Cookies from "universal-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import OkModal from "./OkModal";
import styled, { css } from "styled-components";
const cookies = new Cookies();

const ErrorModal = ({ error }) => {
  const [okModal, setOkModal] = useState(false);
  const navigate = useNavigate();

  const okModalOnOff = () => {
    setOkModal(!okModal);
    navigate("/login");
  };

  return (
    <>
      <Background>
        <OkModal title={error} modalOnOff={okModalOnOff}></OkModal>
      </Background>
    </>
  );
};

export default ErrorModal;

const Background = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
