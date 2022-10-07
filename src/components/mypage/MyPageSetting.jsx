import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __updateMyInfoStatus } from "../../redux/modules/mypageSlice";
import { removeCookie, getCookie } from "../../shared/cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo_K from "../../assets/logo_kakao.png";
import Logo_N from "../../assets/logo_naver.png";
import Logo_G from "../../assets/logo_google.png";
import { colors } from "../../styles/color";
import { tokenInstance } from "../../api/axios";
import ConfirmSingleModal from "../Modals/ConfirmSingleModal";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.mypage); //유저정보가져옴
  const [secession, setSecession] = useState(false);

  /* -------------------------- 내정보 페이지 공개 비공개 선택 가능 -------------------------- */
  const onSecretHandler = (flag) => {
    dispatch(__updateMyInfoStatus(flag));
  };

  /* ---------------------------------- 로그아웃 ---------------------------------- */
  const onLogoutHandler = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_NOT_AIP}/user/logout`,
      {
        headers: {
          Authorization: getCookie("mycookie"),
        },
      }
    );
    if (response.status === 200) {
      await removeCookie("mycookie");
      await removeCookie("refreshToken");
      await removeCookie("memberId");
      navigate("/");
    }
  };

  /* ---------------------------------- 회원탈퇴 ---------------------------------- */
  const onSecessionHandler = () => {
    setSecession(!secession);
  };

  const confirmModalData = {
    title: "정말 탈퇴 하시겠습니까?",
    submit: "네",
    cancel: "아니오",
  };

  const clickSubmit = async () => {
    const response = await tokenInstance.delete(
      `${process.env.REACT_APP_API_URL}/mypage/withdrawal`,
      {
        headers: {
          Authorization: getCookie("mycookie"),
        },
      }
    );
    if (response.status === 200) {
      await removeCookie("mycookie");
      await removeCookie("refreshToken");
      await removeCookie("memberId");
      navigate("/");
    }
  };

  const closeModal = () => {
    setSecession(!secession);
  };

  return (
    <>
      {secession && (
        <ConfirmSingleModal
          confirmModalData={confirmModalData}
          closeModal={closeModal}
          clickSubmit={clickSubmit}
        ></ConfirmSingleModal>
      )}
      <MyPageWrap>
        <Container>
          <LoginInfo>
            <LoginInfoTitle>로그인 정보</LoginInfoTitle>
            <LoginInfoContent>
              {userInfo.loginType === "GOOGLE" ? (
                <img src={Logo_G} alt="logoImg" />
              ) : null}
              {userInfo.loginType === "KAKAO" ? (
                <img src={Logo_K} alt="logoImg" />
              ) : null}
              {userInfo.loginType === "NAVER" ? (
                <img src={Logo_N} alt="logoImg" />
              ) : null}
              {userInfo.username}
            </LoginInfoContent>
          </LoginInfo>

          {/* 내정보 공개/비공개 */}
          {/* <MyPageFlag>
            <MyPageFlagTitle>내정보 페이지 비공개</MyPageFlagTitle>
            <CheckBoxWrapper>
              <CheckBox secret={userInfo.secret} onClick={() => onSecretHandler(!userInfo.secret)} id="checkbox" type="checkbox" />
              <CheckBoxLabel secret={userInfo.secret} htmlFor="checkbox" />
            </CheckBoxWrapper>
          </MyPageFlag> */}

          <div>
            <LogoutBtn onClick={onLogoutHandler}>로그아웃</LogoutBtn>
          </div>

          <SecessionBox onClick={onSecessionHandler}>
            <span>회원탈퇴</span>
          </SecessionBox>
        </Container>
      </MyPageWrap>
    </>
  );
};
export default MyPage;

const MyPageWrap = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 50px 26px 0;
  box-sizing: border-box;
`;

const LoginInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.HR};
  margin-bottom: 32px;
`;
const LoginInfoTitle = styled.h2`
  font: 500 18px/1 "Noto sans", "sans-serif";
`;
const LoginInfoContent = styled.div`
  font: 16px/1 "Noto sans", "sans-serif";
  color: #7b7b7b;
  padding: 20px 0 28px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    margin-right: 10px;
  }
`;

/* ---------------------------------- 로그아웃 ---------------------------------- */
const LogoutBtn = styled.button`
  width: 100%;
  font: 500 18px/60px "Noto Sans", "sans-serif";
  background: transparent;
  border: 1px solid #b5b5b5;
  color: #424242;
`;

/* ---------------------------------- 회원탈퇴 ---------------------------------- */
const SecessionBox = styled.p`
  cursor: pointer;
  width: 100%;
  text-align: right;
  font-family: "Noto Sans", "sans-serif";
  line-height: 25px;
  span {
    font-size: 12px;
    color: ${colors.gray7B};
    border-bottom: 1px solid ${colors.gray7B};
  }
`;

/* ------------------------------ switch button ----------------------------- */
const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 43px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  ${(props) =>
    !props.secret &&
    css`
      background: #bebebe;
    `}

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 1px;
    background: #ffffff;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
    ${(props) =>
      !props.secret
        ? css`
            margin: 1px;
            box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
            transition: 0.2s;
          `
        : css`
            margin: 1px 0 0 20px;
          `}
  }
  background: ${(props) => (props.secret ? `#35bd47` : null)};
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked {
    ${(props) =>
      props.secret &&
      css`
        background: #35bd47;
        &::after {
          content: "";
          background-color: white;
          display: block;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          margin: 1px 0 0 20px;
          transition: 0.2s;
        }
      `}
  }
`;
