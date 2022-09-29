import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./layout/Layout";
import styled from "styled-components";
import { flexColumn } from "../styles/Flex";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <NotFoundContainer>
          <NotFoundWrap>
            <Span>404</Span>
            죄송합니다. 페이지가 존재하지 않습니다.
            <br />
            요청하신 페이지를 잘못 입력하셨거나, <br /> 페이지의 주소가 변경, <br /> 삭제되어 찾을 수 없습니다.
            <br />
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로 가기
            </Button>
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
  background-color: rgba(237, 251, 202, 0.2);
`;

const NotFoundWrap = styled.div`
  gap: 10px;
  ${flexColumn}
  width: 90%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;
  padding: 55px 0 40px 0;
  border-radius: 4px;
  color: #424242;
`;
const Span = styled.span`
  padding-bottom: 40px;
  width: 150px;
  text-align: center;
  font-weight: 800;
  font-size: 110px;
  line-height: 25px;
  color: #73c600;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.03em;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 3px;
  padding: 4px;
  margin-top: 5px;
  color: #579400;
  border: 2px solid #69b400;
  width: 150px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.03em;
`;
