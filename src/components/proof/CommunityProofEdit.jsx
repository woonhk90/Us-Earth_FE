import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import { useDispatch, useSelector } from "react-redux";
import { patchProof, postProof } from "../../redux/modules/proofsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProofForm from "./ProofForm";
import Cookies from "universal-cookie";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../Modals/IsLoginModal";
import imageCompression from "browser-image-compression";
import Loading from "../etc/Loading";
import ErrorModal from "../Modals/ErrorModal";
import { tokenInstance } from "../../api/axios";

const CommunityProofEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { isLoading, error } = useSelector((state) => state.proofs);

  /* -------------------------------- axios get ------------------------------- */
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [getError, setGetError] = useState(null);

  const getProofs = async (proofId) => {
    try {
      setGetError(null);
      setIsGetLoading(true);
      const { data } = await tokenInstance.get(`/proof/${proofId}`);
      if (!data.writer) {
        navigate(`/community/${param.communityId}/proof/${param.proofId}`);
      }
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
      console.log(error);
      setGetError(error.response.data.message);
    }
    setIsGetLoading(false);
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
    };
  }, []);

  /* ---------------------------------- 사진 업로드 ---------------------------------- */
  const [files, setFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [isPhoto, setIsPhoto] = useState(true);
  const [deleteImgId, setDeleteImgId] = useState([]);
  const [upLoading, setUploading] = useState(100);

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
              setIsPhotoMessage("업로드에 실패하였습니다. 다시 업로드해주세요.");
            }
          } else {
            arry.push(`${i + 1}`);
          }
        } else {
          setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
        }
      }
    } else {
      setIsPhotoMessage("최대 5장까지 등록 가능합니다.");
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
    if (img.imgId !== undefined) setDeleteImgId((deleteImgId) => [...deleteImgId, img.imgId]);
  };

  /* -------------------------------- 빈값 확인 모달 -------------------------------- */
  const [okModal, setOkModal] = useState(false);
  const [okModalTitle, setOkModalTitle] = useState("");

  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  const submitHandler = async () => {
    let formData = new FormData();
    if (title.trim() !== "" && content.trim() !== "" && files.length !== 0) {
      const dataSet = {
        title: title.trim(),
        content: content.trim(),
        imgIdList: deleteImgId,
      };
      console.log(files.length);
      if (files.length > 0) {
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
      await dispatch(patchProof({ proofId: param.proofId, formData: formData })).then((response) => {
        console.log(response);
        if (!response.error) {
          navigate(`/community/detail/${param.communityId}`);
        }
      });
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

  // setError(error.response.data.message);
  if (isGetLoading) {
    return (
      <>
        <>로딩중 이미지</>
      </>
    );
  }

  if (getError) {
    return <ErrorModal error={error} />;
  }

  if (isLoading) {
    return <>작성중 이미지</>;
  }

  if (error) {
    return <ErrorModal error={error} />;
  }

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <ProofForm ProofFormData={ProofFormData} />
    </>
  );
};

export default CommunityProofEdit;
