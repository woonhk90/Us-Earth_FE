import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as CameraWh } from "../../assets/cameraWh.svg";
import Textarea from "../elements/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import cancelWh from "../../assets/cancelWh.svg";
import Header from "../Header";
import { useRef } from "react";
import ImageLoading from "../etc/ImageLoading";
import Button from "../elements/Button";

const ProofForm = ({ ProofFormData }) => {
  const navigate = useNavigate();
  const param = useParams();

  const textRef = useRef();

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = `64px`;
    if (textRef.current.scrollHeight > 64) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    handleResizeHeight();
  }, []);

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
    submitButton: submitButton,
    upLoading: upLoading,
  } = ProofFormData;

  return (
    <>
      <Header>
        <HeaderWrap>
          <Button
            btnType="svg"
            svgType="back"
            onClick={() => {
              navigate(`/community/detail/${param.communityId}`, { replace: true });
            }}
          />
          <HeaderP disabled={!(title.trim() !== "" && content.trim() !== "" && files.length > 0 && upLoading === 100)} onClick={submitHandler}>
            {submitButton}
          </HeaderP>
        </HeaderWrap>
      </Header>
      <CommunityFormWrap>
        <AddPhotoWrap>
          <Stform encType="multipart/form-data">
            <Container>
              <label htmlFor={upLoading < 100 ? null : "file"}>
                <StIcon>
                  <CameraIcon>
                    <CameraWh />
                  </CameraIcon>
                </StIcon>
                <ImageLength>{`(${previewImg.length}/5)`}</ImageLength>
              </label>
              <StImageInput
                multiple
                type="file"
                id="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={(e) => {
                  addImageFile(e);
                }}
              />
            </Container>
          </Stform>
          {previewImg?.map((image, index) => {
            return (
              <Container key={index}>
                <StButton onClick={() => deleteImageFile(image, index)}>
                  {" "}
                  <CancelIcon />
                </StButton>

                <Thumb src={image.imgUrl} alt="img" />
              </Container>
            );
          })}
          {upLoading < 100 ? (
            <Container>
              <LoadingWrap>
                <LoadingPosition>
                  <ImageLoading />
                </LoadingPosition>
              </LoadingWrap>
            </Container>
          ) : null}
          <ErrorMessage>{isPhotoMessage}</ErrorMessage>
        </AddPhotoWrap>
        <BottomWrap>
          <Textarea
            textareaRef={textRef}
            onInput={handleResizeHeight}
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            textareaType="proofTop"
            maxLength="30"
            placeholder="제목"
            name="title"
            value={title}
            onChange={inputOnChangeHandler}
          ></Textarea>
          <Textarea
            cols="50"
            rows="8"
            maxLength="255"
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
  position: relative;
`;

const AddPhotoWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 389px) {
    grid-template-columns: 1fr 1fr;
  }
  flex-wrap: wrap;
  padding: 20px 15px 20px 15px;
  justify-items: center;
  border-bottom: 2px solid rgba(217, 217, 217, 0.3);
`;

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 9px;
`;

const LoadingWrap = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Stform = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

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
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;

const HeaderWrap = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 13px 13px 13px 16px;
  box-sizing: border-box;
  z-index: 1;
  border-bottom: 1px solid #f5f5f5;
`;

const HeaderP = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.03em;
  color: #222222;
  :disabled {
    color: #cdcdcd;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -15px;
  left: 0;
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ff0000;
  padding: 0 24px 18px 24px;
`;
