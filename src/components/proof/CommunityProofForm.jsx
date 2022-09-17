import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch, useSelector } from "react-redux";
import { postProof } from "../../redux/modules/proofsSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import { certifyReset } from "../../redux/modules/communitySlice";
import Cookies from "universal-cookie";

const CommunityProofForm = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { dateStatus, participant } = useSelector((state) => state.community.communityDetail);
   const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    title: "",
    content: "",
  });

  const { title, content } = inputData;
  useEffect(() => {
    console.log(cookies.get("mycookie"))
    if (cookies.get("mycookie") === undefined) {
      navigate("/login");
    }
    if(!participant || dateStatus !== "ongoing") {
      navigate(`/community/detail/${param.communityId}`);
    } 
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
    let arry = [];
    setIsPhotoMessage("");
    if (e.target.files.length + previewImg.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size < 20000000) {
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
      setIsPhotoMessage("사진은 5장까지만 업로드 가능합니다.");
      setIsPhoto(false);
    }
    if (arry?.length > 0) {
      setIsPhotoMessage(`${arry}번째 파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.`);
    }
  };

  // X버튼 클릭 시 이미지 삭제
  const deleteImageFile = (img, index) => {
    setIsPhotoMessage("");
    setPreviewImg(previewImg.filter((file, id) => id !== index));
    setFiles(files.filter((file, id) => id !== index));
  };

  const submitHandler = async () => {
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
        console.log(files);
        files.map((file) => formData.append("multipartFile", file));
      }
      formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
      console.log(dataSet);
      await dispatch(postProof({ communityId: param.communityId, formData: formData }));
      dispatch(certifyReset());
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
  };

  return (
    <>
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofForm;
