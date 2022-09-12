import React, { useCallback, useEffect, useState } from "react";
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

const CommentInputEdit = () => {
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

  const onInputHandler = () => {
    setInputOn(!inputOn);
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
      setContent(commentList.content);
      if (commentList.img === null) {
        setImageFile([]);
        setPreviewImg([]);
      } else {
        setImageFile([commentList.img.imgUrl]);
        setPreviewImg([commentList.img.imgUrl]);
      }
    } catch (error) {}
  };

  /* ----------------------------- edit useEffect(*) ---------------------------- */
  useEffect(() => {
    if (commentEdit.editMode) {
      getComments({
        proofId: param.proofId,
        commentId: commentEdit.commentId,
      });
    }
    return () => {
      // unmount clean code
      if (!commentEdit.editMode) {
        imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
        commentReset();
        setImageFile([]);
        setPreviewImg([]);
        dispatch(commentEditChange({}));
      }
    };
  }, [commentEdit.commentId]);

  /* ---------------------------------- photo upload ---------------------------------- */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [deleteImg, setDeleteImg] = useState(false);

  // add image
  const addImageFile = (e) => {
    let reader = new FileReader();
    if (e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      setImageFile(e.target.files[0]);
      reader.onloadend = () => {
        const previewImgUrl = reader.result;
        setPreviewImg([previewImgUrl]);
      };
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
    }

    // data reset function
    commentReset();
    setImageFile([]);
    setPreviewImg([]);
    console.log(content, deleteImg, imageFile);
  };

  /* -------------------------------- edit modal ------------------------------- */
  const [modal, setModal] = useState(false);

  // modal text data
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

  const modalOnOff = () => {
    setModal(!modal);
  };

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
        <SubmitButton onClick={onClickSubmit}>수정</SubmitButton>
        <SubmitButton onClick={modalOnOff}>수정취소</SubmitButton>
        {modal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={modalOnOff}></ConfirmModal>}
      </CommentInputWrap>
    </>
  );
};

export default CommentInputEdit;

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
