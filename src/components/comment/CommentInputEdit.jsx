import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { patchComment, commentWriteMode } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";
import { tokenInstance } from "../../api/axios";

const CommentInputEdit = ({ userToken }) => {
  const inputRef = useRef();
  const param = useParams();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  const { dateStatus } = useSelector((state) => state.comments.comments);
  const { participant } = useSelector((state) => state.heartComment.heartCommentCnt);

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
      formData.append("dto", new Blob([JSON.stringify({ content: content, delete: deleteImg })], { type: "application/json" }));

      // dispatch formData
      dispatch(patchComment({ commentId: commentEdit.commentId, proofId: param.proofId, formData: formData }));
      setInputOn(false);
      commentReset();
      setImageFile([]);
      setPreviewImg([]);
      textRef.current.style.height = `auto`;
    }
  };

  return (
    <>
      <CommentInputContainer ref={inputRef}>
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
              disabled={!participant || dateStatus === "end"}
              img={previewImg}
              rows="1"
              inputOn={inputOn}
              emptyCheck={inputOn || content.length || previewImg.length}
              maxLength="100"
              value={content}
              onChange={(e) => {
                setIsPhotoMessage("");
                commentOnChange(e);
              }}
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

export default CommentInputEdit;

const CommentInputContainer = styled.div`
  width: 100%;
`;

const CommentInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  background-color: #f9f9f9;
`;

const InputWrap = styled.div`
  position: relative;
  margin: 9px 0px 9px 0px;
  width: 100%;
  background-color: ${(props) => (props.participant ? "#f9f9f9" : "white")};
  border: 1px solid #ececec;
  border-radius: 6px;
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

const CameraIcon = styled.div`
  cursor: pointer;
  width: 30px;
  background-color: transparent;
  padding: 20px 12px 0px 12px;
`;

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
  color: #9b9b9b;
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

const CancelIcon = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  top: -4px;
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

  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

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
