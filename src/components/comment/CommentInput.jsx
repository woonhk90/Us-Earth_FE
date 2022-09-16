import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";
import Textarea from "../elements/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import LoginModal from "../Modals/LoginModal";
import cancelWh from "../../assets/cancelWh.svg";
import { useRef } from "react";
import Button from "../elements/Button";

const CommentInput = ({ userToken }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const [content, commentOnChange, commentReset] = useInput("");
  const { commentEdit } = useSelector((state) => state.comments);
  const [editContent, setEditContent] = useState(commentEdit.comment);
  const [inputOn, setInputOn] = useState(false);
  const onInputHandler = () => {
    if (userToken) {
      setInputOn(!inputOn);
    } else {
      setModal(!modal);
    }
  };
  console.log("인풋", inputOn);

  useEffect(() => {
    return () => {
      // imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
      commentReset();
    };
  }, [editContent]);
  /* ---------------------------------- 사진 업로드 ---------------------------------- */

  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");

  const addImageFile = (e) => {
    setIsPhotoMessage("");
    let reader = new FileReader();
    if (e.target.files.length > 0) {
      if (e.target.files[0].size < 2000000) {
        reader.readAsDataURL(e.target.files[0]);
        setImageFile(e.target.files[0]);
        reader.onloadend = () => {
          const previewImgUrl = reader.result;
          setPreviewImg([previewImgUrl]);
        };
      } else {
        setPreviewImg([]);
        setIsPhotoMessage("사진 사이즈가 20MB를 초과했습니다.");
      }
    }
  };

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = () => {
    setImageFile([]);
    setPreviewImg([]);
    // imageUrlLists.push(currentImageUrl);
  };

  /* ---------------------------------- submit ---------------------------------- */
  const onClickSubmit = () => {
    if (!userToken) {
      setModal(!modal);
    } else {
      if (inputOn) {
        let formData = new FormData();
        if (content === "") {
          alert("내용을 입력해 주세요");
        } else {
          formData.append("multipartFile", imageFile);
          formData.append("dto", new Blob([JSON.stringify({ content: content })], { type: "application/json" }));
          dispatch(postComment({ proofId: param.proofId, formData: formData }));
          setInputOn(false);

          // clear input
          commentReset();
          setImageFile([]);
          setPreviewImg([]);
        }
      } else return;
    }
  };
  const [modal, setModal] = useState(false);

  const inputOnButton = () => {
    console.log(userToken);
    if (userToken) {
      setInputOn(true);
    } else {
      setModal(true);
    }
  };

  const modalOnOff = () => {
    setModal(!modal);
  };

  return (
    <>
      <CommentInputWrap>
        {modal && <LoginModal modalOnOff={modalOnOff} modal={modal}></LoginModal>}
        <form disabled={false} onClick={inputOnButton} encType="multipart/form-data">
          <StLabel htmlFor={!userToken ? null : "file"}>
            <StIcon>
              <CameraIcon>
                <Camera />
              </CameraIcon>
            </StIcon>
          </StLabel>
          <StImageInput type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} />
        </form>
        <InputWrap inputOn={inputOn}>
          {isPhotoMessage ? <ErrorMessageP>{isPhotoMessage}</ErrorMessageP> : null}
          {inputOn ? (
            <>
              {previewImg.length > 0 && (
                <>
                  <Container>
                    <DeleteButton onClick={deleteImageFile}>
                      <CancelIcon>
                        <CancelWh />
                      </CancelIcon>
                    </DeleteButton>
                    <Thumb src={previewImg} alt="img" />
                  </Container>
                </>
              )}
              <TextareaWrap>
                <Textarea
                  cols="50"
                  rows="8"
                  maxLength="100"
                  textareaType="comment"
                  autoFocus={true}
                  value={content}
                  onChange={commentOnChange}
                  placeholder="댓글을 입력해주세요"
                />
              </TextareaWrap>
            </>
          ) : (
            <TextareaP style={{ cursor: "pointer" }} onClick={onInputHandler}>
              댓글을 입력해주세요.
            </TextareaP>
          )}
        </InputWrap>
        <SubmitButton>
          <Button btntype="submit" onClick={onClickSubmit}>
            등록
          </Button>
        </SubmitButton>
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
  padding: 0px 0px 0px 14px;
  /* border-top: 1px solid gray; */
  /* background-color: #3a3a3a; */
  background-color: #f9f9f9;
`;

const InputWrap = styled.div`
  width: 100%;
  /* margin: 5px 8px 14px 8px; */
  margin: ${(props) => (!props.inputOn ? "5px 8px 0px 8px" : "5px 8px 14px 8px")};
  border-radius: 6px;
  /* background-color: ${(props) => (!props.inputOn ? "white" : "#ac2727")}; */
  background-color: ${(props) => (props.inputOn ? "white" : "#f9f9f9")};
`;

const SubmitButton = styled.div``;
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
  width: 30px;
  height: 30px;
  margin: 9px 9px 0 0;
  background-color: transparent;
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
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 80px;
  background-color: #525252;
  border: none;
`;

const Container = styled.section`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const StIcons = styled.div`
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
  width: 12px;
  height: 12px;
  position: absolute;
  right: 7px;
  top: 5px;
  border-radius: 50%;
  z-index: 99;
  /* background-image: url("${cancelWh}"); */
`;

const FormWrap = styled.button``;

const CameraIcon = styled.div`
  width: 34px;
  /* height: 30px; */
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

const TextareaP = styled.p`
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.03em;
`;

const TextareaWrap = styled.div`
  /* height: 54px; */
`;

const ErrorMessageP = styled.p`
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.03em;
`;
