import React from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import blackLogo from "../assets/logo/blackLogo.png";
import styled from "styled-components";
import { flexColumn } from "../styles/Flex";
import { colors } from "../styles/color";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <NotFoundWrap>
        <Img src={blackLogo} alt="logoBottom" />
        <TopSpan>죄송합니다. 페이지가 존재하지 않습니다.</TopSpan>
        <BottomSpan>
          요청하신 페이지를 잘못 입력하거나,
          <br />
          주소가 변경·삭제되어 찾을 수 없습니다.
        </BottomSpan>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          메인으로 돌아가기
        </Button>
      </NotFoundWrap>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const NotFoundWrap = styled.div`
  ${flexColumn}
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
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
  border-radius: 4px;
  color: #424242;
`;

const Img = styled.img`
  width: 130px;
  padding-bottom: 50px;
  @media (max-width: 340px) {
    width: 100px;
    padding-bottom: 35px;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #ffffff;
  border: 1px solid #b5b5b5;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  padding: 17px 0;
  text-align: center;
  letter-spacing: -0.03em;
  color: #424242;
  @media (max-width: 340px) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

const TopSpan = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.black22};
  padding-bottom: 13px;
  @media (max-width: 340px) {
    font-size: 14px;
  }
`;
const BottomSpan = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.black22};
  padding-bottom: 50px;
  @media (max-width: 340px) {
    font-size: 13px;
    padding-bottom: 35px;
  }
`;
