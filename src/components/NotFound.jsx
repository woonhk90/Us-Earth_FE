import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./layout/Layout";
import styled from "styled-components";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <NotFoundContainer>
          <NotFoundWrap>
            죄송합니다. 페이지가 존재하지 않습니다.
            <br />
            요청하신 페이지를 잘못 입력하셨거나, 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            <br />
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로 가기
            </button>
          </NotFoundWrap>
        </NotFoundContainer>
      </Layout>
    </>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(232, 255, 148, 0.6);
`;
const NotFoundWrap = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
