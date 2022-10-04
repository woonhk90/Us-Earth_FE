import React, { useCallback, useEffect, useState, useRef } from "react";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { commentWriteMode, postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import OkModal from "../Modals/OkModal";
import imageCompression from "browser-image-compression";
import isLogin from "../../lib/isLogin";
import CommentForm from "./CommentForm";

const CommentInput = ({ userToken }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const param = useParams();
  const [content, commentOnChange, commentReset] = useInput("");
  const { dateStatus } = useSelector((state) => state.comments.comments);
  const [inputOn, setInputOn] = useState(false);
  const { participant } = useSelector((state) => state.heartComment.heartCommentCnt);
  const textRef = useRef();
  const [height, setHeight] = useState(0);

  const onChangeContent = (e) => {
    setIsPhotoMessage("");
    commentOnChange(e);
    dispatch(commentWriteMode(content.length));
  };

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = `40px`;
    if (textRef.current.scrollHeight < 100) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    } else textRef.current.style.height = `100px`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", clickInputOutside);
    return () => {
      window.removeEventListener("mousedown", clickInputOutside);
    };
  }, [inputOn]);

  /* -------------------------- 댓글 작성 실패 모달 -------------------------- */
  const [okModal, setOkModal] = useState(false);
  const [okModalTitle, setOkModalTitle] = useState(false);

  // onOff Modal
  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  // user check
  const canWriteCheck = () => {
    if (!isLogin()) {
      setOkModalTitle(`로그인을 해주세요.`);
      setOkModal(true);
    }
    if (participant && dateStatus === "end") {
      setOkModalTitle(`그룹 미션이 종료되어 댓글을 작성할 수 없습니다.`);
      setOkModal(true);
    } else if (!participant && userToken) {
      setOkModalTitle("그룹 참가자만 댓글을 작성할 수 있습니다.");
      setOkModal(true);
    }
  };

  const clickInputOutside = (event) => {
    setInputOn(inputRef.current.contains(event.target));
    setHeight(inputRef.current.clientHeight);
    dispatch(commentWriteMode(inputRef.current.clientHeight));
  };

  /* ---------------------------------- 사진 업로드 ---------------------------------- */

  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
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

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = () => {
    setImageFile([]);
    setPreviewImg([]);
    setIsPhotoMessage("");
  };
  /* ---------------------------------- submit ---------------------------------- */
  const onClickSubmit = () => {
    if (upLoading === 100) {
      if (content.trim() === "") {
        return setIsPhotoMessage("내용을 입력해주세요.");
      }
      if (participant && dateStatus === "ongoing") {
        let formData = new FormData();
        formData.append("multipartFile", imageFile);
        formData.append("dto", new Blob([JSON.stringify({ content: content.trim() })], { type: "application/json" }));
        dispatch(postComment({ proofId: param.proofId, formData: formData }));
        setInputOn(false);
        commentReset();
        setImageFile([]);
        setPreviewImg([]);
        textRef.current.style.height = `auto`;
      }
    }
  };
  const formData = {
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
  };
  return (
    <>
      {okModal && <OkModal title={okModalTitle} modalOnOff={okModalOnOff}></OkModal>}
      <CommentForm formData={formData} />
    </>
  );
};

export default CommentInput;
