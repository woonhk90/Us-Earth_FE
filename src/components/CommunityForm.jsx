import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import useInputs from "./useInputs";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postCommunityFormData } from "../hooks/Query";

const CommunityForm = () => {
  const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  //query
  const queryClient = useQueryClient();
  const { mutate: addMutateData } = useMutation((data) => postCommunityFormData(data), {
    onSuccess: (data) => {
      console.log(data);
      // queryClient.setQueryData("sleep_list", (sleep_times) => {
      //   return [...sleep_times, data];
      // });

      //방법1
      // key를 넣지 않을 경우 모든 쿼리가 무효화됩니다.
      // mutation을 성공하면 수면 데이터 목록을 불러오는 useQuery를 무효화 시켜줍니다!
      // post후 바로 fetch해주기 위해! usequery를 무효화 시켜서 수면 데이터 목록을 다시 불러오기~
      // queryClient.invalidateQueries("sleep_list");
      // day_input.current.value = "";
      // time_input.current.value = "";
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      inputReset();
    };
  }, []);

  /* ---------------------------------- 사진 업로드 ---------------------------------- */

  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [isPhoto, setIsPhoto] = useState(true);

  const addImageFile = (e) => {
    if (e.target.files.length + files.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size < 2000000) {
          // 20메가
          console.log(e.target.files[i].size);
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          reader.onload = () => {
            const previewImgUrl = reader.result;
            setPreviewImg((previewImg) => [...previewImg, previewImgUrl]);
          };
          const currentFiles = e.target.files[i];
          setFiles((files) => [...files, currentFiles]);
          setIsPhotoMessage("");
        } else {
          setIsPhotoMessage("파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.");
          console.log(`${i}번째`, e.target.files[i].size);
        }
      }
    } else {
      setIsPhotoMessage("사진은 5장까지만 업로드 가능합니다.");
      setIsPhoto(false);
    }
  };

  console.log(previewImg);
  console.log(files);

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = (index) => {
    console.log(index);
    setIsPhotoMessage("");
    setPreviewImg(previewImg.filter((file, id) => id !== index));
    setFiles(files.filter((file, id) => id !== index));
  };

  const submitHandler = () => {
    let formData = new FormData();
    if (title === "") {
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (files.length === 0) {
      alert("사진을 추가해 주세요");
    } else {
      const dataSet = {
        ...inputData,
      };
      if (files.length > 0) {
        files.map((file) => formData.append("multipartFile", file));
      }
      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      console.log(dataSet);
      // addMutateData(formData);
    }
  };

  return (
    <>
      <CommunityFormWrap>
        <div>인증 게시글 작성</div>
        <div>이미지</div>
        <AddPhotoWrap>
          <Stform encType="multipart/form-data">
            <StLabel htmlFor="file">
              <StIcon>○</StIcon>
            </StLabel>
            <StImageInput multiple type="file" id="file" accept="image/*" onChange={(e) => addImageFile(e)} />
            {/* <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={(e) => addImageFile(e)} /> */}
          </Stform>
          <div>
            {previewImg.map((image, index) => {
              return (
                <Container key={index}>
                  <StButton key={index} onClick={() => deleteImageFile(index)}>
                    버튼
                  </StButton>
                  <Thumb src={image} alt="img" />
                </Container>
              );
            })}
          </div>
        </AddPhotoWrap>

        <div>{isPhotoMessage}</div>
        <div>제목</div>
        <input name="title" value={title} onChange={inputOnChangeHandler}></input>
        <div>내용</div>
        <textarea name="content" value={content} onChange={inputOnChangeHandler}></textarea>
        <button onClick={submitHandler}>등록</button>
      </CommunityFormWrap>
    </>
  );
};

export default CommunityForm;

const CommunityFormWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  border-radius: 12px;
  display: block;
  width: auto;
  height: 100%;
  margin-left: 5px;
`;

//사진

const AddPhotoWrap = styled.div`
  /* display: flex;
  justify-content: flex-start;
  background-color: green;
  width: 100%; */
`;

const Stform = styled.form`
  /* display: inline-blosck;
  justify-content: center;
  align-items: center; */
`;
const StImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const StLabel = styled.label``;
const StIcon = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 100px;
  height: 100px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;
const StButton = styled.button`
  /* position: absolute; */
  right: -20px;
  top: -15px;
  z-index: 99;
`;

const Container = styled.div`
  /* position: relative; */
  width: 100px;
  height: 100px;
  margin: 5px;
`;

const Thumb = styled.img`
  background-size: contain;
  background-position: center;
  border: 1px solid black;
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;
