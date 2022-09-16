import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import cameraWh from "../../assets/cameraWh.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as CameraWh } from "../../assets/cameraWh.svg";
import cancelWh from "../../assets/cancelWh.svg";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const ProofForm = ({ ProofFormData }) => {
  const navigate = useNavigate();

  const {
    files: files,
    previewImg: previewImg,
    isPhotoMessage: isPhotoMessage,
    inputOnChangeHandler: inputOnChangeHandler,
    title: title,
    content: content,
    submitHandler: submitHandler,
    deleteImageFile: deleteImageFile,
    addImageFile: addImageFile,
  } = ProofFormData;

  return (
    <>
      <>
        <Header>
          <HeaderWrap>
            <IconDiv>
              <Back
                onClick={() => {
                  navigate("/mypage");
                }}
              />
            </IconDiv>
            <HeaderP onClick={submitHandler}>등록</HeaderP>
          </HeaderWrap>
        </Header>
      </>
      <CommunityFormWrap>
        <Test>
          <AddPhotoWrap>
            <Stform encType="multipart/form-data">
              <Container>
                <label htmlFor="file">
                  <StIcon>
                    <CameraIcon>
                      <CameraWh />
                    </CameraIcon>
                  </StIcon>
                  <ImageLength>({previewImg.length}/5)</ImageLength>
                </label>
                <StImageInput multiple type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
              </Container>
            </Stform>
            {previewImg?.map((image, index) => {
              return (
                <ImageContainer key={index}>
                  <Container>
                    <StButton onClick={() => deleteImageFile(image, index)}>
                      <CancelIcon>{/* <Cancel/> */}</CancelIcon>
                    </StButton>
                    <Thumb src={image.imgUrl} alt="img" />
                  </Container>
                </ImageContainer>
              );
            })}
          </AddPhotoWrap>
          <ErrorMessage>{isPhotoMessage}</ErrorMessage>
        </Test>
        <BottomWrap>
          <Input inputype="proof"    maxLength="30" placeholder="제목" name="title" value={title} onChange={inputOnChangeHandler}></Input>
          <Textarea
            cols="50"
            rows="8"
            maxLength="500"
            textareaType="proof"
            placeholder="내용을 입력해주세요"
            name="content"
            value={content}
            onChange={inputOnChangeHandler}
          ></Textarea>
        </BottomWrap>
      </CommunityFormWrap>
    </>
  );
};

export default ProofForm;

const CommunityFormWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Test = styled.div`
  border-bottom: 2px solid rgba(217, 217, 217, 0.3);
`;

const Test2 = styled.div``;

const AddPhotoWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  padding: 20px 15px;
  justify-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 9px;
`;

const Stform = styled.form`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div``;

const BottomWrap = styled.div`
width: 100%;
box-sizing: border-box;
`;

const StImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const ImageLength = styled.div`
  position: absolute;
  color: white;
  letter-spacing: -0.03em;
  font-weight: 400;
  font-size: 18px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CameraIcon = styled.div`
  width: 37px;
  height: 30px;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StIcon = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  /* border: 1px solid #cccccc; */
  border-radius: 10px;
`;

//삭제 아이콘 위치
const CancelIcon = styled.div`
  width: 17px;
  height: 17px;
  position: absolute;
  right: 4.5px;
  top: 4.5px;
  border-radius: 50%;
  z-index: 99;
  background-image: url("${cancelWh}");
`;
const StButton = styled.button`
  background-color: #525252;
  position: absolute;
  width: 26px;
  height: 26px;
  right: -15px;
  top: -13px;
  border: none;
  border-radius: 50%;
  z-index: 99;
`;

const Thumb = styled.img`
  background-size: contain;
  background-position: center;
  /* border: 1px solid black; */
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;
const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 13px;
  box-sizing: border-box;
  z-index: 1;
  border-bottom: 1px solid #f5f5f5;
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;

const HeaderP = styled.p`
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.03em;
  color: #222222;
`;

const ErrorMessage = styled.div`
  display: absolute;
`;
