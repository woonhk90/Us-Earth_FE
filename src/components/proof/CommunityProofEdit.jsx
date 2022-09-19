import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch } from "react-redux";
import { postCommunityDetail } from "../../redux/modules/communityFormSlice";
import { patchProof, postProof } from "../../redux/modules/proofsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL;

const CommunityProofEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const param = useParams();

  /* -------------------------------- axios get ------------------------------- */
  const getProofs = async (proofId) => {
    try {
      const authorization_token = cookies.get("mycookie");
      const { data } = await axios.get(`${API_URL}/proof/${proofId}`, {
        Authorization: authorization_token,
      });
      const { img, title, content } = data;
      img.map((imgdata) => {
        setPreviewImg((previewImg) => [
          ...previewImg,
          {
            imgId: imgdata.id,
            imgUrl: imgdata.imgUrl,
          },
        ]);
        setFiles((files) => [
          ...files,
          {
            imgId: imgdata.id,
            imgUrl: imgdata.imgUrl,
          },
        ]);
      });
      setUseInputs({
        title: title,
        content: content,
      });
    } catch (error) {
      return error;
    }
  };
  const [inputData, inputOnChangeHandler, inputReset, isForm, isSubmit, setUseInputs] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  useEffect(() => {
    getProofs(param.proofId);
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
  const [deleteImgId, setDeleteImgId] = useState([]);

  console.log(files);
  console.log(previewImg);
  const addImageFile = (e) => {
    console.log("업로드!", e.target.files);
    let arry = [];
    setIsPhotoMessage("");
    if (e.target.files.length + previewImg.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size < 2000000) {
          // 20메가
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          reader.onload = () => {
            const previewImgUrl = reader.result;
            setPreviewImg((previewImg) => [...previewImg, { imgUrl: previewImgUrl }]);
          };
          const currentFiles = e.target.files[i];
          setFiles((files) => [...files, currentFiles]);
        } else {
          arry.push(`${i + 1}`);
        }
      }
    } else {
      setIsPhotoMessage("사진은 5장까지만 등록 가능합니다.");
      setIsPhoto(false);
    }
    if (arry?.length > 0) {
      setIsPhotoMessage(`${arry}번째 파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.`);
    }
  };

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = (img, index) => {
    console.log("삭제!", img, index);
    setIsPhotoMessage("");
    setPreviewImg(previewImg.filter((file, id) => id !== index));
    setFiles(files.filter((file, id) => id !== index));

    // setFiles(files.filter((file, id) => 0id !== 2index - 2previewImg.length));
    console.log(previewImg.length);
    if (img.imgId !== undefined) setDeleteImgId((deleteImgId) => [...deleteImgId, img.imgId]);
  };
  console.log(deleteImgId);

  const submitHandler = () => {
    let formData = new FormData();
    if (title === "") {
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (previewImg.length === 0) {
      alert("사진을 추가해 주세요");
    } else {
      const dataSet = {
        ...inputData,
        imgIdList: deleteImgId,
      };
      console.log(files.length);
      if (files.length > 0) {
        console.log(files);
        let imgLists = [];
        for (let i = 0; i < files.length; i++) {
          console.log(files[i].imgId);
          if (files[i].imgId === undefined) {
            imgLists.push(files[i]);
          }
        }
        console.log(imgLists);
        imgLists.map((file) => formData.append("multipartFile", file));
      }
      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      console.log(dataSet);
      dispatch(patchProof({ proofId: param.proofId, formData: formData }));
      navigate(`/community/detail/${param.communityId}`);
    }
  };

  const ProofFormData = {
    files: files,
    previewImg: previewImg,
    isPhotoMessage: isPhotoMessage,
    inputOnChangeHandler: inputOnChangeHandler,
    title: title,
    content: content,
    submitHandler: submitHandler,
    deleteImageFile: deleteImageFile,
    addImageFile: addImageFile,
    submitButton:"수정"
  };

  return (
    <>
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofEdit;
