import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { commentWriteMode, postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import { ReactComponent as Edit } from "../../assets/Edit2.svg";
import OkModal from "../Modals/OkModal";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";
import isLogin from "../../lib/isLogin";
import ErrorModal from "../Modals/ErrorModal";

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

  return (
    <>
      {okModal && <OkModal title={okModalTitle} modalOnOff={okModalOnOff}></OkModal>}
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
              disabled={!participant || dateStatus === "end"}
              img={previewImg}
              rows="1"
              inputOn={inputOn}
              emptyCheck={inputOn || content.length || previewImg.length}
              maxLength="255"
              value={content}
              onChange={(e) => {
                setIsPhotoMessage("");
                commentOnChange(e);

                dispatch(commentWriteMode(content.length));
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

export default CommentInput;

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
    height: 37px;
    max-height: ${(props) => (props.inputOn ? "100px" : "37px")};
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
