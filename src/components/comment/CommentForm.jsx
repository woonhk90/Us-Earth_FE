import React from "react";
import styled from "styled-components";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import { colors } from "../../styles/color";
import ImageLoading from "../etc/ImageLoading";

const CommentForm = ({ formData }) => {

  const {
    inputRef: inputRef,
    canWriteCheck: canWriteCheck,
    participant: participant,
    upLoading: upLoading,
    inputOn: inputOn,
    previewImg: previewImg,
    isPhotoMessage: isPhotoMessage,
    dateStatus: dateStatus,
    content: content,
    textRef: textRef,
    handleResizeHeight: handleResizeHeight,
    onClickSubmit: onClickSubmit,
    onChangeContent: onChangeContent,
    deleteImageFile:deleteImageFile,
    addImageFile:addImageFile,
  } = formData;

  return (
    <>
      <CommentInputContainer ref={inputRef} onClick={canWriteCheck}>
        <CommentInputWrap>
          <form encType="multipart/form-data">
            <StLabel htmlFor={!participant || upLoading < 100 ? null : "file"}>
              <CameraIcon>
                <Camera height="25" />
              </CameraIcon>
            </StLabel>
          </form>
          <InputWrap participant={!participant} inputOn={inputOn}>
            {upLoading < 100 ? (
              <Container>
                <LoadingContainer>
                  <LoadingPosition>
                    <ImageLoading />
                  </LoadingPosition>
                </LoadingContainer>
              </Container>
            ) : (
              <>
                {previewImg.length > 0 && inputOn && (
                  <Container>
                    <DeleteButton onClick={deleteImageFile}>
                      <CancelIconWrap>
                        <CancelIcon>
                          <CancelWh />
                        </CancelIcon>
                      </CancelIconWrap>
                    </DeleteButton>
                    <Thumb src={previewImg} alt="img" />
                  </Container>
                )}
                {isPhotoMessage ? <ErrorMessageP>{isPhotoMessage}</ErrorMessageP> : null}
              </>
            )}
            <CommentTextarea
              participant={!participant}
              disabled={!participant || dateStatus === "end"}
              img={previewImg}
              rows="1"
              inputOn={inputOn}
              emptyCheck={inputOn || content.length || previewImg.length}
              maxLength="255"
              value={content}
              onChange={onChangeContent}
              placeholder="댓글을 입력해주세요"
              ref={textRef}
              onInput={handleResizeHeight}
            />
          </InputWrap>
          <StImageInput
            type="file"
            id="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={(e) => {
              addImageFile(e);
              e.target.value = "";
            }}
          />
          <WriteIcon onClick={onClickSubmit}>등록</WriteIcon>
        </CommentInputWrap>
      </CommentInputContainer>
    </>
  );
};

export default CommentForm;


/* -------------------------------- 컨테이너 div -------------------------------- */

const CommentInputContainer = styled.div`
  width: 100%;
`;

const CommentInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: ${colors.grayF9}
`;

const InputWrap = styled.div`
  position: relative;
  margin: 9px 0px 9px 0px;
  width: 100%;
  background-color: ${(props) => (props.participant ? colors.grayF9 : "white")};
  border: 1px solid #ececec;
  border-radius: 6px;
`;

const Container = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 11px;
  margin-bottom: 5px;
  width: 100px;
  height: 100px;
`;

/* --------------------------------- 사진 아이콘 --------------------------------- */

const StLabel = styled.label`
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
`;

const CameraIcon = styled.div`
  cursor: pointer;
  width: 30px;
  background-color: transparent;
  padding: 20px 12px 0px 12px;
`;

/* --------------------------------- 이미지 업로딩 -------------------------------- */

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 100px;
  z-index: 999;
  background-color: #d9d9d9;
  align-items: center;
  border-radius: 6px;
`;

const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/* ----------------------------------- 사진 ----------------------------------- */
const DeleteButton = styled.button`
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: -6px;
  left: 90px;
  background-color: #525252;
  border: none;
`;

const CancelIconWrap = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 7px;
  top: 5px;
  border-radius: 50%;
  z-index: 99;
`;

const CancelIcon = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  top: -4px;
  z-index: 100;
`;

const Thumb = styled.img`
  position: absolute;
  top: 0;
  background-size: 100px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 6px;
`;

const StImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

/* ----------------------------------- 인풋 ----------------------------------- */
const ErrorMessageP = styled.p`
  padding: 5px 10px 5px 10px;
  font-weight: 200;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #ff0000;
`;

const CommentTextarea = styled.textarea`
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;
  box-sizing: border-box;
  background-color: ${(props) => (props.participant ? colors.grayF9: "white")};
  width: 100%;
  outline: none;
  color: #222222;
  height: 40px;
  max-height: ${(props) => (props.inputOn ? "100px" : "40px")};
  border: none;
  padding: 11px;
  padding-bottom: 6px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 6px;
  letter-spacing: -0.03em;
  ::placeholder {
    color: #939393;
  }

  @media (max-width: 389px) {
    font-size: 14px;
    height: 37px;
    max-height: ${(props) => (props.inputOn ? "100px" : "37px")};
  }
`;


/* ---------------------------------- 작성 버튼 --------------------------------- */
const WriteIcon = styled.div`
  cursor: pointer;
  background-color: transparent;
  margin: 20px 8px 0px 8px;
  width: 54px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.03em;
  color: ${colors.gray9B};
`;




