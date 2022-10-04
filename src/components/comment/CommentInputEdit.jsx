import React, { useCallback, useEffect, useState, useRef } from "react";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { patchComment, commentWriteMode } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import CommentForm from "./CommentForm";
import { tokenInstance } from "../../api/axios";

const CommentInputEdit = () => {
  const inputRef = useRef();
  const param = useParams();
  const dispatch = useDispatch();
  const { dateStatus } = useSelector((state) => state.comments.comments);
  const { participant } = useSelector((state) => state.heartComment.heartCommentCnt);
  const onChangeContent = (e)=>{
    setIsPhotoMessage("");
    commentOnChange(e);
  }
  // find commentId of edit(*)
  const { commentEdit } = useSelector((state) => state.comments);

  // input onChange
  const [content, commentOnChange, commentReset, setContent] = useInput("");

  /* --------------------------------- on input -------------------------------- */
  const [inputOn, setInputOn] = useState(false);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = `40px`;
    if (textRef.current.scrollHeight < 100) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    } else textRef.current.style.height = `100px`;
  }, []);

  const clickInputOutside = (event) => {
    setInputOn(inputRef.current.contains(event.target));

    dispatch(commentWriteMode(inputRef.current.clientHeight));
  };

  /* -------------------------------- axios get ------------------------------- */

  const getComments = async (payload) => {
    try {
      const { data } = await tokenInstance.get(`/comments/${payload.proofId}`);
      setInputOn(true);
      // find data & into input
      const commentList = data.commentResponseDtoList.find((comment) => comment.commentId === payload.commentId);
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
      getComments({
        proofId: param.proofId,
        commentId: commentEdit.commentId,
      });
    }
    return () => {
      window.removeEventListener("mousedown", clickInputOutside);
    };
  }, [commentEdit.commentId]);

  useEffect(() => {
    handleResizeHeight();
  }, [inputOn]);

  /* ---------------------------------- photo upload ---------------------------------- */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [deleteImg, setDeleteImg] = useState(false);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [upLoading, setUploading] = useState(100);

  const addImageFile = async (e) => {
    setIsPhotoMessage("");
    const acceptImageFiles = ["image/png", "image/jpeg", "image/jpg"];
    const imageFile = e.target.files[0];
    if (acceptImageFiles.includes(imageFile.type)) {
      if (imageFile.size < 21000000) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (data) => {
            setUploading(data);
          },
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          let reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          setImageFile(compressedFile);
          reader.onloadend = () => {
            const previewImgUrl = reader.result;
            setPreviewImg([previewImgUrl]);
          };
          const convertedBlobFile = new File([compressedFile], imageFile.name, { type: imageFile.type, lastModified: Date.now() });
          setImageFile(convertedBlobFile);
        } catch (error) {
          setIsPhotoMessage("오류가 발생했습니다. 다시 업로드해주세요.");
        }
      } else setIsPhotoMessage("20mb이상의 이미지만 가능합니다.");
    } else setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
  };

  // delete image
  const deleteImageFile = () => {
    setImageFile([]);
    setPreviewImg([]);
    setDeleteImg(true);
    setIsPhotoMessage("");
  };

  /* ---------------------------------- submit(*) ---------------------------------- */
  const onClickSubmit = () => {
    let formData = new FormData();
    // validation
    if (upLoading === 100) {
      if (content.trim() === "") {
        return setIsPhotoMessage("내용을 입력해주세요.");
      }
      formData.append("multipartFile", imageFile);
      formData.append("dto", new Blob([JSON.stringify({ content: content.trim(), delete: deleteImg })], { type: "application/json" }));

      // dispatch formData
      dispatch(patchComment({ commentId: commentEdit.commentId, proofId: param.proofId, formData: formData }));
      setInputOn(false);
      commentReset();
      setImageFile([]);
      setPreviewImg([]);
      textRef.current.style.height = `auto`;
    }
  };

  const formData = {
    inputRef: inputRef,
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
  };

  return (
    <>
        <CommentForm formData={formData} />
    </>
  );
};

export default CommentInputEdit;