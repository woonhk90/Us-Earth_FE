import React, { useState } from "react";
import styled, { css } from "styled-components";
import cameraWh from "../../assets/cameraWh.svg";
import { flexBetween, flexColumn } from "../../styles/Flex";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import CalendarModal from "./CalendarModal";
import ImageLoading from "../etc/ImageLoading";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../elements/Button";

const Form = ({ formData }) => {
  const [modal, setModal] = useState(false);

  const {
    upLoading: upLoading,
    previewImg: previewImg,
    addImageFile: addImageFile,
    OnClickDeleteImage: OnClickDeleteImage,
    isPhotoMessage: isPhotoMessage,
    textRef: textRef,
    handleResizeHeight: handleResizeHeight,
    title: title,
    onChangeTitle: onChangeTitle,
    isTitle: isTitle,
    dates: dates,
    toDay: toDay,
    isdate: isdate,
    limitParticipants: limitParticipants,
    onChangelimitParticipants: onChangelimitParticipants,
    isLimitParticipants: isLimitParticipants,
    limitScore: limitScore,
    isLimitScore: isLimitScore,
    onChangelimitScore: onChangelimitScore,
    content: content,
    onChangeContent: onChangeContent,
    isContent: isContent,
    submitcheck: submitcheck,
    validation: validation,
  } = formData;

  return (
    <>
      <>
        <CommunityFormWrap>
          <ImageBoxWrap>
            <ImageForm encType="multipart/form-data">
              <label htmlFor={upLoading < 100 ? null : "file"}>
                <ImageIcon>
                  {upLoading < 100 ? (
                    <Container>
                      <LoadingPosition>
                        <ImageLoading />
                      </LoadingPosition>
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
                accept="image/jpg, image/jpeg, image/png"
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
          <TopTextWrap>
            <P>그룹명*</P>
          </TopTextWrap>
          <InputWrap>
            <Textarea
              rows="2"
              textareaRef={textRef}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              onInput={handleResizeHeight}
              maxLength="30"
              textareaType="communityForm"
              placeholder="그룹명을 입력해 주세요"
              name="title"
              value={title}
              onChange={onChangeTitle}
            ></Textarea>
            <MessageP>{isTitle}</MessageP>
          </InputWrap>
          <div
            onClick={() => {
              setModal(!modal);
            }}
          >
            <P>진행 기간*</P>
            <InputWrap>
              {dates.start?.length > 0 && dates.end?.length > 0 ? (
                <>
                  <SelectDateP color={"#222222"}>
                    {dates.start}-{dates.end}
                  </SelectDateP>
                  <MessageP date={true}>{toDay === dates.start ? `진행 이후에는 수정 및 삭제가 불가능합니다.` : null}</MessageP>
                </>
              ) : (
                <>
                  <DateP color={"#CBCBCB"}>날짜를 선택해 주세요.</DateP>
                  <MessageP>{isdate}</MessageP>
                </>
              )}
            </InputWrap>
          </div>
          {modal && <CalendarModal closeModal={() => setModal(!modal)}></CalendarModal>}
          <P>참여인원*</P>
          <InputWrap>
            <Input
              inputype="basic"
              maxLength="2"
              placeholder="인원을 입력해 주세요(최대 10명)"
              type="tel"
              name="limitParticipants"
              value={limitParticipants}
              onChange={onChangelimitParticipants}
            ></Input>
            <MessageP>{isLimitParticipants}</MessageP>
          </InputWrap>
          <P>목표달성 수*</P>
          <InputWrap>
            <Input
              inputype="basic"
              maxLength="3"
              type="tel"
              name="limitScore"
              placeholder="목표달성 수를 입력해주세요(최대 100)"
              value={limitScore}
              onChange={onChangelimitScore}
            ></Input>
            <MessageP limitScore={true}>{isLimitScore}</MessageP>
          </InputWrap>
          <P>그룹소개*</P>
          <InputWrap>
            <Textarea
              placeholder="소개글을 입력해 주세요"
              cols="50"
              rows="8"
              maxLength="255"
              name="content"
              textareaType="basic"
              value={content}
              onChange={onChangeContent}
            ></Textarea>
            <MessageP bottom={true}>{isContent}</MessageP>
          </InputWrap>
        </CommunityFormWrap>
        <BottomWrap>
          {/^([1-9]|10)$/.test(limitParticipants) &&
          /^[1-9][0-9]?$|^100/.test(limitScore) &&
          parseInt(limitScore) >= parseInt(limitParticipants) &&
          title.trim() !== "" &&
          content.trim() !== "" &&
          dates.end?.length > 0 ? (
            <Button btnType="submit" on="on" onClick={submitcheck}>
              그룹 등록
            </Button>
          ) : (
            <Button btnType="submit" onClick={validation}>
              그룹 등록
            </Button>
          )}
        </BottomWrap>
      </>
    </>
  );
};

export default Form;

const CommunityFormWrap = styled.div`
  margin: 51px 16px 60px 16px;
`;

/* ----------------------------------- image ---------------------------------- */
const ImageBoxWrap = styled.div`
  ${flexColumn}
`;

const ImageForm = styled.form`
  width: 206px;
  height: 206px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 12px;
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

const Container = styled.div`
  position: absolute;
  background-size: contain;
  background-position: center;
  width: 206px;
  height: 206px;
  border-radius: 14px;
  z-index: 999;
  background-color: #cbcbcb;
  align-items: center;
`;

const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
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

const ImageInput = styled.input`
  width: 0;
  height: 0;
  overflow: hidden;
  cursor: pointer;
`;

const TextWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 0px;
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ff0000;
`;

/* -------------------------------- 비밀번호, 그룹명 ------------------------------- */

const RightText = styled.p`
  font-size: 18px;
  text-align: right;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const TopTextWrap = styled.div`
  ${flexBetween}
`;

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

const BottomWrap = styled.div`
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
  display: flex;
  text-align: center;
`;

/* ----------------------------------- 입력값 ---------------------------------- */

const P = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
  margin-top: 20px;
`;

const InputWrap = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
`;

const MessageP = styled.p`
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  position: absolute;
  right: 0;
  bottom: ${(props) => (props.bottom ? "10px" : "5px")};
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.02em;
  color: #ff0000;

  @media (max-width: 389px) {
    ${(props) =>
      props.limitScore ||
      (props.date &&
        css`
          font-size: 12px;
          bottom: 3px;
          line-height: 14px;
        `)}
  }
`;

/* ---------------------------------- 진행기간 ---------------------------------- */

const SelectDateP = styled.p`
  box-sizing: content-box;
  height: 32px;
  margin: 0;
  font-size: 22px;
  padding: 10px 0 26px 0;
  font-weight: 700;
  color: ${(props) => props.color};

  @media (max-width: 389px) {
    font-size: 20px;
  }
`;

const DateP = styled.p`
  box-sizing: content-box;
  height: 35px;
  margin: 0;
  font-size: 22px;
  padding: 5px 0 26px 0;
  font-weight: 700;
  color: ${(props) => props.color};

  @media (min-width: 281px) and (max-width: 389px) {
    font-size: 16px;
  }
  @media (max-width: 280px) {
    font-size: 14px;
  }
`;
