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
    </>
  );
};

export default ErrorModal;