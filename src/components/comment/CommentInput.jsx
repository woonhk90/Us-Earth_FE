import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useDropzone } from "react-dropzone";

const CommentInput = () => {
  const [content, commentOnChange, commentReset] = useInput("");
  console.log(content);

  /* ---------------------------------- 사진 업로드 ---------------------------------- */

  const [imageFile, setImageFile] = useState([]);
  // 미리보기 이미지
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
  const commentOnClick = () => {
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
      <form encType="multipart/form-data">
        <StLabel htmlFor="file">
          <StIcon>○</StIcon>
        </StLabel>
        <StImageInput type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
        {/* <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} /> */}
      </form>
      <div>
        {previewImg.length > 0 && (
          <Container>
            <button onClick={deleteImageFile}>버튼</button>
            <Thumb src={previewImg} alt="img" />
          </Container>
        )}
      </div>
      <input value={content} onChange={commentOnChange} placeholder="댓글을 입력해주세요"></input>
      <button onClick={commentOnClick}>등록</button>
    </>
  );
};

export default CommentInput;

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
  width: 80px;
  height: 80px;
  padding: 4px;
  box-sizing: border-box;
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
`;
