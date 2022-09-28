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
  background-color: rgba(231, 255, 143, 0.2);
`;

const NotFoundWrap = styled.div`
  gap: 10px;
  ${flexColumn}
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;

  color: #424242;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 5px;
  background: linear-gradient(180deg, #e4ffbd 0%, rgba(193, 250, 107, 0.7) 100%);
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
  width: 150px;
  text-align: center;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.03em;
`;
