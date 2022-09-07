import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import CalendarModal from "./CalendarModal";
import { useSelector } from "react-redux";
import { flexBetween } from "../../styles/Flex";

const CommunityForm = () => {
  const { dates } = useSelector((state) => state.communityForm);
  const { start, end } = dates;
  const [modal, setModal] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [files, setFiles] = useState([]);
  const [inputData, inputOnChangeHandler, inputReset, isForm, isSubmits] = useInputs({
    limitScore: "",
    limitParticipants: "",
    title: "",
    content: "",
  });
  const inputValid = Object.values(isForm);
  const result = inputValid.filter((word) => word !== true);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const { limitScore, limitParticipants, title, content } = inputData;

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      inputReset();
    };
  }, []);

  /* ------------------------------ photo upload ------------------------------ */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  const addImageFile = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setImageFile(e.target.files[0]);
    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      setPreviewImg([previewImgUrl]);
    };
  };

  /* --------------- password validation & secret switch button --------------- */
  const pwOnChangeHandler = (e) => {
    const passwordRegex = /^([0-9]){4}$/;
    const passwordCurrent = e.target.value;
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자 4자리를 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const secretSwitchButtonHandler = useCallback(() => {
    if (isSecret === false) {
      setPassword("");
      setIsPassword(false);
      setIsSecret(true);
    } else {
      setIsSecret(false);
      setIsPassword(false);
    }
  }, [isSecret]);

  /* ---------------------------------- submit ---------------------------------- */
  const submitHandler = () => {
    console.log(/^\d{1,10}$/.test(limitParticipants));
    let formData = new FormData();
    const dataSet = {
      ...inputData,
      password: password,
      isSecret: isSecret,
      startDate: start,
      endDate: end,
    };
    formData.append("multipartFile", imageFile);
    formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
    console.log(dataSet);
    console.log(imageFile);
    // addMutateData(formData);
  };

  return (
    <>
      <CommunityFormWrap>
        <ImageBoxWrap>
          <ImageForm encType="multipart/form-data">
            <label htmlFor="file">
              <ImageIcon>
                {previewImg.length > 0 ? <Thumb src={previewImg} alt="img" /> : <div>아이콘</div>}
                <BottonTextWrap>
                  <BottomText>대표이미지</BottomText>
                </BottonTextWrap>
              </ImageIcon>
            </label>
            <ImageInput type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
          </ImageForm>
        </ImageBoxWrap>
        <RightText>비공개</RightText>
        <TopTextWrap>
          <P>그룹명*</P>
          <CheckBoxWrapper>
            <CheckBox onClick={secretSwitchButtonHandler} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
        </TopTextWrap>
        <Input size="22px" placeholder="그룹명을 입력해주세요" name="title" value={title} onChange={inputOnChangeHandler}></Input>
        {isSecret ? (
          <>
            <P>비밀번호</P>
            <Input placeholder="비밀번호를 입력해 주세요" maxLength="4" value={password} onChange={pwOnChangeHandler} type="password"></Input>
            {password.length > 0 && <span>{passwordMessage}</span>}
          </>
        ) : null}
        <DateSpan
          onClick={() => {
            setModal(!modal);
          }}
        >
          {dates.start?.length > 0 && dates.end?.length > 0 ? (
            <StartEndDate>
              {dates.start}-{dates.end}
            </StartEndDate>
          ) : (
            <StartEndDate color={"#6c6c6ceb"}>날짜를 선택해 주세요.*</StartEndDate>
          )}
        </DateSpan>
        {modal && <CalendarModal closeModal={() => setModal(!modal)}></CalendarModal>}
        <P>참여인원*</P>
        <Input
          placeholder="인원을 입력해주세요(최대 10명)"
          type="number"
          name="limitParticipants"
          value={limitParticipants}
          onChange={inputOnChangeHandler}
        ></Input>
        <P>목표달성갯수*</P>
        <Input type="number" name="limitScore" value={limitScore} onChange={inputOnChangeHandler}></Input>
        <P>그룹소개*</P>
        <Textarea
          placeholder="소개글을 입력해주세요"
          height="150px"
          cols="50"
          rows="8"
          size="18px"
          maxLength="200"
          name="content"
          value={content}
          onChange={inputOnChangeHandler}
        ></Textarea>
      </CommunityFormWrap>
      <FooterWrap>
        {/^[1-9]*$/.test(limitParticipants) &&
        /^[1-9]*$/.test(limitScore) &&
        result.length === 0 &&
        dates.start?.length > 0 &&
        dates.end?.length > 0 &&
        isSecret === isPassword ? (
          <FooterMenus color={"#000000eb"} onClick={submitHandler} bgColor={"#808080ec"}>
            그룹 등록
          </FooterMenus>
        ) : (
          <FooterMenus color={"#ccccccec"} bgColor={"#979797eb"}>
            그룹등록불가
          </FooterMenus>
        )}
      </FooterWrap>
    </>
  );
};

export default CommunityForm;

const CommunityFormWrap = styled.div`
  margin: 53px 16px 16px 16px;
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
  }
`;

const StartEndDate = styled.div`
  font-size: 22px;
  color: ${(props) => props.color};
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #35bd47;
    &::after {
      background-color: white;
      display: block;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      margin: 1px 0 0 20px;
      transition: 0.2s;
    }
  }
`;

/* ----------------------------------- image ---------------------------------- */
const ImageBoxWrap = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ImageForm = styled.form`
  width: 206px;
  height: 206px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 36px;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  cursor: pointer;
`;

const ImageIcon = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 206px;
  height: 206px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 14px;
  position: relative;
`;

const Thumb = styled.img`
  background-size: contain;
  background-position: center;
  width: 206px;
  height: 206px;
  border-radius: 14px;
`;

const BottonTextWrap = styled.div`
  position: absolute;
  align-items: center;
  box-sizing: border-box;
  padding: 11px 53px;
  margin: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 39px;
  border-radius: 0 0 14px 14px;
  z-index: 99;
  background: #b1b0b0;
  background-size: 100%;
  display: flex;
`;

const BottomText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

/* ------------------------------ bottom button ----------------------------- */
const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  display: flex;
  text-align: center;
`;

const FooterMenus = styled.div`
  width: 100%;
  line-height: 48px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

/* ---------------------------------- font ---------------------------------- */
const DateSpan = styled.div`
  border-bottom: 1px solid rgb(238, 238, 238);
  margin: 30px 0;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const RightText = styled.p`
  font-size: 18px;
  text-align: right;
`;

const TopTextWrap = styled.div`
  ${flexBetween}
`;
