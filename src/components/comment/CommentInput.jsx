import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";

const CommentInput = () => {
  const [content, commentOnChange, commentReset] = useInput("");

  /* ---------------------------------- 사진 업로드 ---------------------------------- */

  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const addImageFile = (e) => {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    setImageFile(e.target.files[0]);

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      setPreviewImg([previewImgUrl]);
    };
  };
  console.log(previewImg);
  console.log(imageFile);

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = () => {
    setImageFile([]);
    setPreviewImg([]);
    // imageUrlLists.push(currentImageUrl);
  };

  /* ---------------------------------- submit ---------------------------------- */
  const onClickSubmit = () => {
    let formData = new FormData();
    if (content === "") {
      alert("내용을 입력해 주세요");
    } else {
      formData.append("multipartFile", imageFile);
      formData.append("dto", new Blob([JSON.stringify({ content: content })], { type: "application/json" }));
      //  addCommentMutateData(formData);
    }
  };

  return (
    <>
      <CommentInputWrap>
        <form encType="multipart/form-data">
          <StLabel htmlFor="file">
            <StIcon>○</StIcon>
          </StLabel>
          <StImageInput type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
          {/* <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} /> */}
        </form>
        <InputWrap>
          <div>
            {previewImg.length > 0 && (
              <Container>
                <DeleteButton onClick={deleteImageFile}>x</DeleteButton>
                <Thumb src={previewImg} alt="img" />
              </Container>
            )}
          </div>
          <textarea value={content} onChange={commentOnChange} placeholder="댓글을 입력해주세요"></textarea>
        </InputWrap>
        <SubmitButton onClick={onClickSubmit}>등록</SubmitButton>
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
  padding: 5px 10px 15px 10px;
`;

const InputWrap = styled.div`
  width: 100%;
  border: 1px solid grey;
  margin: 0 8px;
  border-radius: 6px;
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
