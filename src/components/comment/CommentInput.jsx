import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";
import Textarea from "../elements/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import { flexBetween, flexColumn, flexRow } from "../../styles/Flex";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";

import { ReactComponent as Edit } from "../../assets/Edit2.svg";
import Button from "../elements/Button";
import OkModal from "../Modals/OkModal";
import ConfirmModal from "../Modals/ConfirmModal";

const CommentInput = ({ userToken }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const param = useParams();
  const [content, commentOnChange, commentReset] = useInput("");
  const { dateStatus, participant } = useSelector((state) => state.community.communityDetail);
  const [inputOn, setInputOn] = useState(false);

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    console.log(textRef.current.style.height);
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
  console.log(inputOn);

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
  };

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
      <CommentInputContainer ref={inputRef} onClick={canWriteCheck}>
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
              img={previewImg}
              rows="1"
              inputOn={inputOn}
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
          <StImageInput type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} />
          {/* </Column> */}
          <form encType="multipart/form-data">
            <StLabel htmlFor={!participant ? null : "file"}>
              <CameraIcon>
                <Camera height="25" />
              </CameraIcon>
            </StLabel>
          </form>
          <WriteIcon>
            <Edit height="25" onClick={onClickSubmit} />
          </WriteIcon>
        </CommentInputWrap>
      </CommentInputContainer>
    </>
  );
};

export default CommentInput;

const CommentInputContainer = styled.div`
  width: 100%;
  .edit2-1 {
    fill: #cbcbcb;
  }
  .camera-1 {
    fill: #cbcbcb;
  }
`;

const CommentInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
  /* padding: 0px 0px 0px 14px; */
  background-color: #f9f9f9;
`;

const InputWrap = styled.div`
  margin: 9px 0px 9px 16px;
  width: 100%;
  background-color: white;
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
  padding: 21px 0px 0px 15px;
`;

const WriteIcon = styled.div`
  cursor: pointer;
  background-color: transparent;
  height: 30px;
  padding: 21px 15px 0px 15px;
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
  top: 0px;
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

const ErrorMessageP = styled.p`
  padding: 10px 10px 5px 10px;
  font-weight: 200;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #ff0000;
`;

// background-image:  ${({ img }) => `url(${img})`};
// background-size: 100px;
// background-repeat: no-repeat;
// back
const CommentTextarea = styled.textarea`
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  color: #222222;
  height: 44px;
  max-height: ${(props) => (props.inputOn ? "150px" : "44px")};
  border: none;
  padding: 11px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 6px;
  letter-spacing: -0.03em;
  ::placeholder {
    color: #939393;
  }
`;

const ButtonWrap = styled.div``;
