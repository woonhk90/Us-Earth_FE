import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const ProofForm = ({ ProofFormData }) => {
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
      <CommunityFormWrap>
        <div>인증 게시글 작성</div>
        <div>이미지</div>
        <AddPhotoWrap>
          <Stform encType="multipart/form-data">
            <Container>
              <label htmlFor="file">
                <StIcon>○</StIcon>
                <ImageLength>({previewImg.length}/5)</ImageLength>
              </label>
              <StImageInput multiple type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
            </Container>
          </Stform>
          {previewImg?.map((image, index) => {
            return (
              <ImageContainer key={index}>
                <Container>
                  <StButton onClick={() => deleteImageFile(image, index)}>버튼</StButton>
                  <Thumb src={image.imgUrl} alt="img" />
                </Container>
              </ImageContainer>
            );
          })}
        </AddPhotoWrap>
        <div>{isPhotoMessage}</div>
        <div>제목</div>
        <input name="title" value={title} onChange={inputOnChangeHandler}></input>
        <div>내용</div>
        <textarea name="content" value={content} onChange={inputOnChangeHandler}></textarea>
        <button onClick={submitHandler}>등록</button>
      </CommunityFormWrap>
    </>
  );
};

export default ProofForm;

const CommunityFormWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  border-radius: 12px;
  display: block;
  width: auto;
  height: 100%;
  margin-left: 5px;
`;

//사진

const AddPhotoWrap = styled.div`
  /* justify-content: flex-start; */
  flex-wrap: wrap;
  margin-right: 10px;
  /* margin: auto; */
  /* background-color: green; */
  width: 100%;
  display: flex;
`;

const Stform = styled.form`
  /* display: inline-block; */
  justify-content: center;
  align-items: center;
`;
const StImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  /* width: 100%; */
  /* padding: 0 10px; */
`;

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 10px;
`;

const ImageLength = styled.div`
  position: absolute;
  top: 65%;
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
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;
const StButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: -20px;
  top: -15px;
  z-index: 99;
`;

const Thumb = styled.img`
  background-size: contain;
  background-position: center;
  border: 1px solid black;
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;
