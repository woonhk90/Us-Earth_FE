import Cookies from "universal-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import OkModal from "./OkModal";
import styled, { css } from "styled-components";
import Layout from "../layout/Layout";
const cookies = new Cookies();

const ErrorModal = ({ error, navigation }) => {
  const [okModal, setOkModal] = useState(false);
  const navigate = useNavigate();

  const okModalOnOff = () => {
    setOkModal(!okModal);
    navigation ? navigate(navigation) : navigate("/");
  };

  return (
    <>
      <OkModal title={error} modalOnOff={okModalOnOff}></OkModal>
    </>
  );
};

export default ErrorModal;
