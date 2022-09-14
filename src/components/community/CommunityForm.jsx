import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { flexBetween } from "../../styles/Flex";
import { postCommunityDetail } from "../../redux/modules/communityFormSlice";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { clearVal } from '../../redux/modules/communitySlice';
=======
import cameraWh from "../../assets/cameraWh.svg";
>>>>>>> a8a4d1a1cae12df9b7048135962640a2c0c2accb

const CommunityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => state.communityForm);
  const { start, end } = dates;
  const [modal, setModal] = useState(false);
  const [secret, setSecret] = useState(false);
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

  const deleteImage = (e) => {
    e.preventDefault();
    setPreviewImg([]);
    setImageFile([]);
  };

  /* --------------- password validation & secret switch button --------------- */
  const pwOnChangeHandler = (e) => {
    const passwordRegex = /^([0-9]){4}$/;
    const passwordCurrent = e.target.value;
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자 4자리를 입력해 주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const secretSwitchButtonHandler = () => {
    if (secret === false) {
      setPassword("");
      setIsPassword(false);
      setSecret(true);
    } else {
      setSecret(false);
      setIsPassword(false);
      setPassword("");
    }
  };

  /* ---------------------------------- submit ---------------------------------- */
  const submitHandler = () => {
    console.log(/^\d{1,10}$/.test(limitParticipants));
    let formData = new FormData();
    const dataSet = {
      ...inputData,
      password: password,
      secret: secret,
      startDate: start,
      endDate: end,
    };
    formData.append("multipartFile", imageFile);
    formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
    console.log(dataSet);
    console.log(imageFile);
    dispatch(postCommunityDetail(formData));
    dispatch(clearVal());
    navigate('/community');
  };

  return (
    <>
      <CommunityFormWrap>
        <ImageBoxWrap>
          <ImageForm encType="multipart/form-data">
            <label htmlFor="file">
              <ImageIcon>
                {previewImg.length > 0 ? <Thumb src={previewImg} alt="img" /> : <CameraIcon />}
                <BottonTextWrap>
                  <BottomText>대표이미지</BottomText>
                </BottonTextWrap>
              </ImageIcon>
              {/* <button onClick={deleteImage}>삭제</button> */}
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
        <Input inputype="basic" placeholder="그룹명을 입력해 주세요" name="title" value={title} onChange={inputOnChangeHandler}></Input>
        {secret ? (
          <>
            <P>비밀번호</P>
            <Input inputype="basic" placeholder="비밀번호를 입력해 주세요" maxLength="4" value={password} onChange={pwOnChangeHandler} type="password"></Input>
            {password.length > 0 && <span>{passwordMessage}</span>}
          </>
        ) : null}
        <DateSpan
          onClick={() => {
            setModal(!modal);
          }}
        >
          <P>진행 기간*</P>
          {dates.start?.length > 0 && dates.end?.length > 0 ? (
            <DateP color={"#424242"}>
              {dates.start}-{dates.end}
            </DateP>
          ) : (
            <DateP color={"#CBCBCB"}>날짜를 선택해 주세요.</DateP>
          )}
        </DateSpan>
        {modal && <CalendarModal closeModal={() => setModal(!modal)}></CalendarModal>}
        <P>참여인원*</P>
        <Input
          inputype="basic"
          placeholder="인원을 입력해 주세요(최대 10명)"
          type="number"
          name="limitParticipants"
          value={limitParticipants}
          onChange={inputOnChangeHandler}
        ></Input>
        <P>목표달성갯수*</P>
        <Input inputype="basic" type="number" name="limitScore" placeholder="최대 100개" value={limitScore} onChange={inputOnChangeHandler}></Input>
        <P>그룹소개*</P>
        <Textarea
          placeholder="소개글을 입력해 주세요"
          cols="50"
          rows="8"
          maxLength="200"
          name="content"
          textareaType="basic"
          value={content}
          onChange={inputOnChangeHandler}
        ></Textarea>
      </CommunityFormWrap>
      <BottomWrap>
        {/^([1-9]|10)$/.test(limitParticipants) &&
        /^[1-9][0-9]?$|^100/.test(limitScore) &&
        result.length === 0 &&
        dates.start?.length > 0 &&
        dates.end?.length > 0 &&
        secret === isPassword ? (
          <BottomButton
            style={{
              cursor: "pointer",
            }}
            onClick={submitHandler}
            bgColor={"#353535"}
            color={"white"}
          >
            그룹 등록
          </BottomButton>
        ) : (
          <BottomButton disabled={true} bgColor={"#EDEDED"} color={"#BEBEBE"}>
            그룹 등록
          </BottomButton>
        )}
      </BottomWrap>
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
  width: 54px;
  height: 29px;
  border-radius: 15px;
  background: #cbcbcb;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin: 2px 0px 0px 2px;
    background: #ffffff;
    /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2); */
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 54px;
  height: 29px;
  &:checked + ${CheckBoxLabel} {
    background: #353535;
    &::after {
      background-color: white;
      display: block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      margin: 2px 0px 0px 27px;
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
  width: 206px;
  height: 206px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 14px;
  position: relative;
`;

const CameraIcon = styled.div`
  width: 92px;
  height: 74px;
  background-image: url("${cameraWh}");
  background-repeat: no-repeat;
  background-size: 92px;
  color: transparent;
  background-position: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  padding: 11px 0;
  text-align: center;
  margin: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 39px;
  border: none;
  border-radius: 0 0 14px 14px;
  z-index: 99;
  background: #cbcbcb;
  background-size: 100%;
  display: flex;
`;

const BottomText = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

/* ------------------------------ bottom button ----------------------------- */
const BottomWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  text-align: center;
`;

const BottomButton = styled.button`
  width: 100%;
  border: none;
  line-height: 56px;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

/* ---------------------------------- form font ---------------------------------- */
const DateSpan = styled.div`
  margin: 30px 0;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
  margin-top: 26px;
`;

const DateP = styled.p`
  box-sizing: content-box;
  height: 35px;
  margin: 0;
  font-size: 22px;
  padding: 10px 0 26px 0;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  color: ${(props) => props.color};
`;

const RightText = styled.p`
  font-size: 18px;
  text-align: right;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const TopTextWrap = styled.div`
  ${flexBetween}
`;
