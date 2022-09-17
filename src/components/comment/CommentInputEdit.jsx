import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Textarea from "../elements/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { patchComment, postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import { commentEditChange } from "../../redux/modules/commentsSlice";
import axios from "axios";
import Cookies from "universal-cookie";
import ConfirmModal from "../Modals//ConfirmModal";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import Button from "../elements/Button";
import { flexColumn } from "../../styles/Flex";

const CommentInputEdit = ({ userToken }) => {
  const inputRef = useRef();
  const param = useParams();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;

  // find commentId of edit(*)
  const { commentEdit } = useSelector((state) => state.comments);

  // input onChange
  const [content, commentOnChange, commentReset, setContent] = useInput("");

  /* --------------------------------- on input -------------------------------- */
  const [inputOn, setInputOn] = useState(false);


  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    if (textRef.current.scrollHeight < 150) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  const clickInputOutside = (event) => {
    setInputOn(inputRef.current.contains(event.target));
  };
   
  const inputOnButton = () => {
    if (userToken) {
      setInputOn(true);
      textRef.current.focus();
    }
  };

  /* -------------------------------- axios get ------------------------------- */

  const getComments = async (payload) => {
    try {
      const authorization_token = cookies.get("mycookie");
      const { data } = await axios.get(`${API_URL}/comments/${payload.proofId}`, {
        Authorization: authorization_token,
      });

      // find data & into input
      const commentList = data.commentResponseDtoList.find((comment) => comment.commentId === payload.commentId);
      setInputOn(true);
      console.log("겟요청");
      setContent(commentList.content);
      if (commentList.img === null) {
        setImageFile([]);
        setPreviewImg([]);
      } else {
        setImageFile([commentList.img]);
        setPreviewImg([commentList.img]);
      }
    } catch (error) {}
  };

  /* ----------------------------- useEffect(*) ---------------------------- */
  useEffect(() => {
    window.addEventListener("mousedown", clickInputOutside);
    if (commentEdit.editMode) {
      console.log("아?");
      getComments({
        proofId: param.proofId,
        commentId: commentEdit.commentId,
      });
    }
    return () => {
      window.removeEventListener("mousedown", clickInputOutside);
    };
  }, [commentEdit.commentId]);

  /* ---------------------------------- photo upload ---------------------------------- */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [deleteImg, setDeleteImg] = useState(false);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");

  // add image
  const addImageFile = (e) => {
    console.log("렌더링되니 이미지파일?");
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
        setIsPhotoMessage("사진은 최대 20MB까지 등록 가능합니다.");
      }
    }
  };

  // delete image
  const deleteImageFile = () => {
    setImageFile([]);
    setPreviewImg([]);
    setDeleteImg(true);
  };

 
  /* ---------------------------------- submit(*) ---------------------------------- */
  const onClickSubmit = () => {
    let formData = new FormData();

    // validation
    if (content === "") {
      alert("내용을 입력해 주세요");
    } else {
      formData.append("multipartFile", imageFile);
      formData.append("dto", new Blob([JSON.stringify({ content: content, delete: deleteImg })], { type: "application/json" }));

      // dispatch formData
      dispatch(patchComment({ commentId: commentEdit.commentId, proofId: param.proofId, formData: formData }));
      setInputOn(false);
      commentReset();
      setImageFile([]);
      setPreviewImg([]);
      textRef.current.style.height = `auto`;
    }

    // data reset function
  };

  /* -------------------------------- edit modal ------------------------------- */
  const [editModal, setEditModal] = useState(false);

  // editModal text data
  const confirmModalData = {
    title: "수정을 취소하시겠습니까?",
    cancel: "아니오",
    submit: "예",
    // submitReturn: "취소되었습니다.",
  };

  // editMode cancel function
  const clickSubmit = () => {
    setImageFile([]);
    setPreviewImg([]);
    commentReset();
    dispatch(commentEditChange({}));
  };

  const editModalOnOff = () => {
    setEditModal(!editModal);
  };

  return (
    <>
     <CommentInputContainer>
        <CommentInputWrap ref={inputRef}>
          <form onClick={inputOnButton} encType="multipart/form-data">
            <StLabel htmlFor={!userToken ? null : "file"}>
              <StIcon>
                <CameraIcon>
                  <Camera />
                </CameraIcon>
              </StIcon>
            </StLabel>
            <StImageInput type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} />
          </form>
          <CommentInputWrap>
            <InputWrap inputOn={inputOn}>
              {isPhotoMessage ? <ErrorMessageP>{isPhotoMessage}</ErrorMessageP> : null}
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
              <CommentTextarea
                emptyCheck={inputOn || content.length || previewImg.length}
                maxLength="100"
                textareaType="comment"
                value={content}
                onChange={commentOnChange}
                placeholder="댓글을 입력해주세요"
                ref={textRef}
                onInput={handleResizeHeight}
                disabled={!userToken}
              />
            </InputWrap>
            <SubmitButtonWrap>
              <Button btntype="submit" onClick={onClickSubmit}>
                수정
              </Button>
              {/* <SubmitButton>
                <Button btntype="submit" onClick={modalOnOff}>
                  수정취소
                </Button>
              </SubmitButton> */}
            </SubmitButtonWrap>
            {editModal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={editModalOnOff}></ConfirmModal>}
          </CommentInputWrap>
        </CommentInputWrap>
      </CommentInputContainer>
    </>
  );
};

export default CommentInputEdit;

const CommentInputContainer = styled.div`
  width: 100%;
`;

const CommentInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0px 0px 0px 14px;
  background-color: #f9f9f9;
`;

const InputWrap = styled.div`
  width: 100%;
  margin: 6px 6px 0 0;
  border-radius: 6px;
  background-color: ${(props) => (props.inputOn ? "white" : "#f9f9f9")};
`;

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
  margin: 9px 0px 0 0;
  background-color: transparent;
  position: relative;
`;

const Thumb = styled.img`
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

const CancelIcon = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  top: -3px;
  z-index: 100;
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

const CameraIcon = styled.div`
  width: 34px;
`;

const ErrorMessageP = styled.p`
  padding: 10px 10px 5px 10px;
  font-weight: 200;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #ff0000;
`;

const SubmitButtonWrap = styled.div`
  ${flexColumn}
`;

const CommentTextarea = styled.textarea`
overflow-wrap: break-word;
word-break: break-all;
white-space: pre-wrap;
resize: none;
box-sizing: border-box;
border: none;
width: 100%;
outline: none;
color: #222222;
height: 38px;
padding: 10px 10px 0 10px;
font-weight: 400;
font-size: 16px;
border-radius: 6px;
letter-spacing: -0.03em;
background-color: ${(props) => (props.emptyCheck ? "white" : "#f9f9f9")};
::placeholder {
  color: #939393;
}
`;
