import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch, useSelector } from "react-redux";
import { postCommunityDetail } from "../../redux/modules/communityFormSlice";
import { patchProof, postProof } from "../../redux/modules/proofsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import axios from "axios";
import Cookies from "universal-cookie";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../../pages/IsLoginModal";
import imageCompression from "browser-image-compression";
import Loading from "../etc/Loading";
import ErrorModal from "../Modals/ErrorModal";

const API_URL = process.env.REACT_APP_API_URL;

const CommunityProofEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const param = useParams();
  const { isLoading, error } = useSelector((state) => state.proofs);

  /* -------------------------------- axios get ------------------------------- */
  const getProofs = async (proofId) => {
    try {
      const authorization_token = cookies.get("mycookie");
      const { data } = await axios.get(`${API_URL}/proof/${proofId}`, {
        headers: {
          Authorization: authorization_token,
        },
      });
      console.log(data);
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
  const [upLoading, setUploading] = useState(100);

  console.log(files);
  console.log(previewImg);

  const addImageFile = async (e) => {
    const acceptImageFiles = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
    let arry = [];
    setIsPhotoMessage("");
    if (e.target.files.length + previewImg.length < 6) {
      for (let i = 0; i < e.target.files.length; i++) {
        if (acceptImageFiles.includes(e.target.files[i].type)) {
          if (e.target.files[i].size < 21000000) {
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
              const compressedFile = await imageCompression(e.target.files[i], options);
              let reader = new FileReader();
              reader.readAsDataURL(compressedFile);
              reader.onloadend = () => {
                const previewImgUrl = reader.result;
                setPreviewImg((previewImg) => [...previewImg, { imgUrl: previewImgUrl }]);
              };
              const convertedBlobFile = new File([compressedFile], e.target.files[i].name, { type: e.target.files[i].type, lastModified: Date.now() });
              setFiles((files) => [...files, convertedBlobFile]);
            } catch (error) {
              console.log(error);
            }
          } else {
            arry.push(`${i + 1}`);
          }
        } else {
          setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
        }
      }
    } else {
      setIsPhotoMessage("사진은 5장까지만 등록 가능합니다.");
      setIsPhoto(false);
    }
    if (arry?.length > 0) {
      setIsPhotoMessage(`추가한 ${arry}번째 파일이 너무 큽니다. 20MB미만의 파일만 업로드 됩니다.`);
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
  /* -------------------------------- 빈값 확인 모달 -------------------------------- */
  const [okModal, setOkModal] = useState(false);
  const [okModalTitle, setOkModalTitle] = useState("");

  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  const submitHandler = async () => {
    let formData = new FormData();
    if (title === "") {
      setOkModalTitle("제목을 입력해 주세요");
      okModalOnOff();
    } else if (content === "") {
      setOkModalTitle("내용을 입력해 주세요");
      okModalOnOff();
    } else if (files.length === 0) {
      setOkModalTitle("사진을 추가해 주세요");
      okModalOnOff();
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
      await dispatch(patchProof({ proofId: param.proofId, formData: formData }));
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
    submitButton: "수정",
    upLoading: upLoading,
    okModal: okModal,
    okModalTitle: okModalTitle,
    okModalOnOff: okModalOnOff,
  };
  if(isLoading){
    return (
      <><Loading/>
    </>
    )
  }
console.log(error)
  // setError(error.response.data.message);
if(error){
  return (
    <><ErrorModal error={error}  /></>
    // 
  )
}

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofEdit;
