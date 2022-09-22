import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { patchComment, postComment } from "../../redux/modules/commentsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as CancelWh } from "../../assets/cancelWh.svg";
import { flexColumn } from "../../styles/Flex";
import { ReactComponent as Edit } from "../../assets/Edit2.svg";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";

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
  const [upLoading, setUploading] = useState(100);

  const addImageFile = async (e) => {
    const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    const imageFile = e.target.files[0];
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    if (acceptImageFiles.includes(imageFile.type)) {
      if (imageFile.size < 21000000) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (data) => {
            console.log(data);
            setUploading(data);
          },
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          let reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          setImageFile(compressedFile);
          reader.onloadend = () => {
            const previewImgUrl = reader.result;
            setPreviewImg([previewImgUrl]);
          };
          const convertedBlobFile = new File([compressedFile], imageFile.name, { type: imageFile.type, lastModified: Date.now() });
          setImageFile(convertedBlobFile);
          // await ; // write your own logic
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


  return (
    <>
      <CommentInputContainer ref={inputRef}>
        <CommentInputWrap>
          <InputWrap inputOn={inputOn}>
            {isPhotoMessage ? <ErrorMessageP>{isPhotoMessage}</ErrorMessageP> : null}
            {upLoading < 100 ? (
              <Container>
                <LoadingContainer>
                  <LoadingWrap>
                    <LoadingPosition>
                      <ImageLoading />
                    </LoadingPosition>
                  </LoadingWrap>
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
              </>
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
              disabled={!userToken}
            />
          </InputWrap>
          <StImageInput type="file" id="file" accept="image/jpg, image/jpeg, image/png" 
            onChange={(e) => {
              addImageFile(e);
              e.target.value = "";
            }} />
          <form onClick={inputOnButton} encType="multipart/form-data">
            <StLabel htmlFor={!userToken ? null : "file"}>
              <CameraIcon>
                <Camera height="25" />
              </CameraIcon>
            </StLabel>
          </form>
          {/* <SubmitButtonWrap> */}
            <WriteIcon>
              <Edit height="25" onClick={onClickSubmit} />
            </WriteIcon>
          {/* </SubmitButtonWrap> */}
          </CommentInputWrap>
      </CommentInputContainer>
    </>
  );
};

export default CommentInputEdit;

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
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
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
top: -10px;
left: 90px;
background-color: #525252;
border: none;
`;

const Container = styled.section`
position: relative;
align-items: center;
display: flex;
flex-direction: row;
margin: 15px;
width: 100px;
height: 100px;
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
  z-index: 0;
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

const LoadingWrap = styled.div`
  /* align-items: center; */
`;
const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
