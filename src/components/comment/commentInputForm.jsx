import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";
import Textarea from "../elements/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const CommentInput = () => {

  return (
    <>
      <CommentInputWrap>
        <form onClick={() => setInputOn(true)} encType="multipart/form-data">
          <StLabel htmlFor="file">
            <StIcon>○</StIcon>
          </StLabel>
          <StImageInput type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
          {/* <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} /> */}
        </form>
        <InputWrap inputOn={inputOn}>
          {inputOn ? (
            <>
              {previewImg.length > 0 && (
                <Container>
                  <DeleteButton onClick={deleteImageFile}>x</DeleteButton>
                  <Thumb src={previewImg} alt="img" />
                </Container>
              )}
              <Textarea value={content} onChange={commentOnChange} placeholder="댓글을 입력해주세요" />
            </>
          ) : (
            <div onClick={onInputHandler}>댓글을 입력해주세요.</div>
          )}
        </InputWrap>
        <SubmitButton onClick={onClickSubmit}>{buttonName}</SubmitButton>
      </CommentInputWrap>
    </>
  );
};

export default CommentInput;

const CommentInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 5px 10px 15px 10px;
  /* border-top: 1px solid gray; */
  background-color: #f9f9f9;
  /* background-color: #a0a0a0; */
`;

const InputWrap = styled.div`
  width: 100%;
  margin: 0 8px;
  border-radius: 6px;
  background-color: ${(props) => (!props.onCommentInput ? "white" : "#f9f9f9")};
`;

const SubmitButton = styled.button`
  width: 60px;
  height: 40px;
`;
//사진

const StImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;
const StLabel = styled.label`
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
`;
const StIcon = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 30px;
  height: 30px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
  position: relative;
`;

const Thumb = styled.img`
  /* display: inline-flex; */
  background-size: 100px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 6px;
`;

const DeleteButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 80px;
`;

const Container = styled.section`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;
