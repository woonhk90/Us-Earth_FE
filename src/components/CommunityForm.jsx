import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import useInputs from "../hooks/useInputs";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postCommunityFormData } from "../hooks/Query";

const CommunityForm = () => {
  const [files, setFiles] = useState([]);
  const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  console.log(files);

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

  //사진
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 20000000, //20메가
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {errors.map((e) => {
        return (
          <div style={{ marginLeft: "10px" }} key={e.code}>
            {e.code}
          </div>
        );
      })}
    </div>
  ));

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <Img
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </Thumb>
  ));

  const submitHandler = () => {
    let formData = new FormData();
    if (title === "") {
      alert("제목을 입력해 주세요");
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
      <div>인증 게시글 작성</div>
      <div>이미지</div>
      <Container>
        <input {...getInputProps()} />
        <StButton {...getRootProps()}>
          <Length>{files.length}/5</Length>
        </StButton>
        <ThumbsContainer>{thumbs}</ThumbsContainer>
        <div>{fileRejectionItems}</div>
      </Container>
      <div>그룹제목</div>
      <input name="title" value={title} onChange={inputOnChangeHandler}></input>
      <div>내용</div>
      <textarea name="content" value={content} onChange={inputOnChangeHandler}></textarea>
      <button onClick={submitHandler}>등록</button>
    </>
  );
};

export default CommunityForm;

//사진
const StButton = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 80px;
  height: 80px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 18px 23px;
  position: relative;
`;

const Thumb = styled.div`
  display: inline-flex;
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

const Length = styled.span`
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 31px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Img = styled.img`
  border-radius: 12px;
  display: block;
  width: auto;
  height: 100%;
  margin-left: 5px;
`;
