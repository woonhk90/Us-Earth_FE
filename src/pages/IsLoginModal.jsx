import Cookies from "universal-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import OkModal from "../components/Modals/OkModal";
import styled, { css } from "styled-components";
const cookies = new Cookies();

const IsLoginModal = () => {
  const [okModal, setOkModal] = useState(false);
  const navigate = useNavigate();
  const [okModalTitle, setOkModalTitle] = useState(false);
  const { dateStatus, participant } = useSelector((state) => state.community.communityDetail);
  // onOff Modal
  
  
  console.log(!!cookies.get("mycookie"));
  const okModalOnOff = () => {
    setOkModal(!okModal);
    navigate("/login");
  };
  const title = "로그인이 필요합니다. 로그인 창으로 이동합니다";
  console.log("모달")
  return (
    <>
      <Background>
        <OkModal title={title} modalOnOff={okModalOnOff}></OkModal>
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
