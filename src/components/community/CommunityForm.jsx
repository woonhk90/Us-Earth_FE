import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { flexBetween, flexColumn, flexRow } from "../../styles/Flex";
import { addDates, postCommunityDetail } from "../../redux/modules/communityFormSlice";
import { useNavigate } from "react-router-dom";
import cameraWh from "../../assets/cameraWh.svg";
import { clearVal } from "../../redux/modules/communitySlice";
import Cookies from "universal-cookie";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../../pages/IsLoginModal";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";

const CommunityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => state.communityForm);
  const { start, end } = dates;
  const [modal, setModal] = useState(false);
  const [secret, setSecret] = useState(false);
  const [files, setFiles] = useState([]);
  const [inputData, inputOnChangeHandler, inputReset, isForm] = useInputs({
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
      dispatch(addDates({}));
    };
  }, []);

  /* ------------------------------ photo upload ------------------------------ */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [upLoading, setUploading] = useState(100);

  const addImageFile = async (e) => {
    const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    const imageFile = e.target.files[0];
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    if (acceptImageFiles.includes(imageFile.type)) {
      if (imageFile.size < 21000000) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (data) => {
            console.log(data);
            setUploading(data);
          },
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          let reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          setImageFile(compressedFile);
          reader.onloadend = () => {
            const previewImgUrl = reader.result;
            setPreviewImg([previewImgUrl]);
          };
          const convertedBlobFile = new File([compressedFile], imageFile.name, { type: imageFile.type, lastModified: Date.now() });
          setImageFile(convertedBlobFile);
          // await ; // write your own logic
        } catch (error) {
          console.log(error);
        }
      } else setIsPhotoMessage("20mb이상의 이미지만 가능합니다.");
    } else setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
  };

  const OnClickDeleteImage = (e) => {
    e.preventDefault();
    setPreviewImg([]);
    setImageFile([]);
  };

  /* --------------- password validation & secret switch button --------------- */
  const pwOnChangeHandler = (e) => {
    const passwordRegex = /^([0-9]){4}$/;
    const passwordCurrent = e.target.value;
    console.log(passwordCurrent);
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("비밀번호 숫자 4자리");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
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
  const submitHandler = async () => {
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
    await dispatch(postCommunityDetail(formData));
    await dispatch(clearVal());
    navigate("/");
  };

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <CommunityFormWrap>
        <ImageBoxWrap>
          <ImageForm encType="multipart/form-data">
            <label htmlFor={upLoading < 100 ? null : "file"}>
              <ImageIcon>
                {upLoading < 100 ? (
                  <Container>
                    <LoadingWrap>
                      <LoadingPosition>
                        <ImageLoading />
                      </LoadingPosition>
                    </LoadingWrap>
                  </Container>
                ) : null}
                {previewImg.length > 0 ? <Thumb src={previewImg} alt="img" /> : <CameraIcon />}
                <BottonTextWrap>
                  <BottomText>대표이미지</BottomText>
                </BottonTextWrap>
              </ImageIcon>
            </label>
            <ImageInput
              multiple
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => {
                addImageFile(e);
                e.target.value = "";
              }}
            />
          </ImageForm>
          <TextWrap>
            <DeleteImage onClick={OnClickDeleteImage}>기본 이미지로 변경</DeleteImage>
            <ErrorMessage>{isPhotoMessage}</ErrorMessage>
          </TextWrap>
        </ImageBoxWrap>
        <RightText>비공개</RightText>
        <TopTextWrap>
          <P>그룹명*</P>
          <CheckBoxWrapper>
            <CheckBox onClick={secretSwitchButtonHandler} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
        </TopTextWrap>
        <Input maxLength="30" inputype="basic" placeholder="그룹명을 입력해 주세요" name="title" value={title} onChange={inputOnChangeHandler}></Input>
        {secret ? (
          <>
            <PasswordWrap>
              <P>비밀번호</P>
              {password.length > 0 && <MessageP>{passwordMessage}</MessageP>}
            </PasswordWrap>
            <Input inputype="basic" placeholder="비밀번호를 입력해 주세요" maxLength="4" value={password} onChange={pwOnChangeHandler} type="password"></Input>
          </>
        ) : null}
        <DateSpan
          onClick={() => {
            setModal(!modal);
          }}
        >
          <P>진행 기간*</P>
          {dates.start?.length > 0 && dates.end?.length > 0 ? (
            <SelectDateP color={"#222222"}>
              {dates.start}-{dates.end}
            </SelectDateP>
          ) : (
            <DateP color={"#CBCBCB"}>날짜를 선택해 주세요.</DateP>
          )}
        </DateSpan>
        {modal && <CalendarModal closeModal={() => setModal(!modal)}></CalendarModal>}
        <P>참여인원*</P>
        <Input
          inputype="basic"
          maxLength="2"
          placeholder="인원을 입력해 주세요(최대 10명)"
          type="tel"
          name="limitParticipants"
          value={limitParticipants}
          onChange={inputOnChangeHandler}
        ></Input>
        <P>목표달성갯수*</P>
        <Input inputype="basic" maxLength="3" type="tel" name="limitScore" placeholder="최대 100개" value={limitScore} onChange={inputOnChangeHandler}></Input>
        <P>그룹소개*</P>
        <Textarea
          placeholder="소개글을 입력해 주세요"
          cols="50"
          rows="8"
          maxLength="500"
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
            bgColor={"#315300"}
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
  margin: 53px 16px 60px 16px;
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
    background: #80bc28;
    &::after {
      background-color: white;
      display: block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      margin: 2px 0px 2px 27px;
      transition: 0.2s;
    }
  }
`;

/* ----------------------------------- image ---------------------------------- */
const ImageBoxWrap = styled.div`
  ${flexColumn}
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 3px;
font-weight: 200;
font-size: 14px;
line-height: 19px;
letter-spacing: -0.02em;
color: #FF0000;
`;
const TextWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageForm = styled.form`
  width: 206px;
  height: 206px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

const ImageInput = styled.input`
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
  position: absolute;
  z-index: 1;
  background-color: white;
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
  z-index: 0;
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

const DeleteImage = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  background-color: transparent;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #9b9b9b;
  margin-bottom: 28px;
`;

const Container = styled.div`
  position: fixed;
  background-size: contain;
  background-position: center;
  width: 206px;
  height: 206px;
  border-radius: 14px;
  z-index: 999;
  background-color: #cbcbcb;
  align-items: center;
`;

const LoadingWrap = styled.div`
  /* align-items: center; */
`;
const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
/* ------------------------------ bottom button ----------------------------- */
const BottomWrap = styled.div`
position: absolute;
bottom:0;
height: 56px;
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

  @media (max-width: 390px) {
    font-size: 16px;
  }
`;
const SelectDateP = styled.p`
  box-sizing: content-box;
  height: 35px;
  margin: 0;
  font-size: 22px;
  padding: 10px 0 26px 0;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  color: ${(props) => props.color};

  @media (max-width: 390px) {
    font-size: 20px;
  }
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

const MessageP = styled.p`
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.02em;
  color: #ff0000;
`;
const PasswordWrap = styled.div`
  ${flexBetween}
  text-align: end;
  align-items: flex-end;
`;
