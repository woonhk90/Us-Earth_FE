import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";
import Textarea from "../elements/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import Button from "../elements/Button";
import OkModal from "../Modals/OkModal";

const CommentInput = ({ userToken }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const param = useParams();
  const [content, commentOnChange, commentReset] = useInput("");
  const { dateStatus, participant } = useSelector((state) => state.community.communityDetail);
  const [inputOn, setInputOn] = useState(false);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    if (textRef.current.scrollHeight < 150) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", clickInputOutside);
    return () => {
      window.removeEventListener("mousedown", clickInputOutside);
      // imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
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
    if (participant && dateStatus === "end") {
      setOkModalTitle(`그룹 미션이 종료되어 댓글을 작성할 수 없습니다.`);
      setOkModal(true);
    } else if (!participant && userToken) {
      setOkModalTitle("그룹 참가자만 댓글을 작성할 수 있습니다.");
      setOkModal(true);
    }
  };

  //
  const clickInputOutside = (event) => {
    setInputOn(inputRef.current.contains(event.target));
    }

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
        setIsPhotoMessage("사진은 최대 20MB까지 등록 가능합니다.");
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
    if (participant && dateStatus === "ongoing") {
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
        textRef.current.style.height = `auto`;
      }
    }
  };

  return (
    <>
      {okModal && <OkModal title={okModalTitle} modalOnOff={okModalOnOff}></OkModal>}
      <CommentInputContainer onClick={canWriteCheck}>
        <CommentInputWrap ref={inputRef}>
          <form encType="multipart/form-data">
            <StLabel htmlFor={!participant ? null : "file"}>
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
              />
            </InputWrap>
            <Button btntype="submit" onClick={onClickSubmit}>
              등록
            </Button>
          </CommentInputWrap>
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
