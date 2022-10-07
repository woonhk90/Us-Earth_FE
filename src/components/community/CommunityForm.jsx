import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ErrorModal from "../Modals/ErrorModal";
import IsLoginModal from "../Modals/IsLoginModal";
import ImageLoading from "../etc/ImageLoading";
import imageCompression from "browser-image-compression";
import "react-datepicker/dist/react-datepicker.css";
import { addDates, postCommunityDetail } from "../../redux/modules/communityFormSlice";
import { clearVal } from "../../redux/modules/communitySlice";
import isLogin from "../../lib/isLogin";
import dayjs from "dayjs";
import ConfirmSingleModal from "../Modals/ConfirmSingleModal";
import { formValid } from "../../utils/formValid";
import Form from "./Form";

const CommunityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.communityForm);

  /* ----------------------------------- 달력 ----------------------------------- */
  const { dates } = useSelector((state) => state.communityForm);
  const { start, end } = dates;
  const toDay = dayjs(new Date()).format("YYYY-MM-DD");

  /* ----------------------------------- 입력값 ---------------------------------- */
  const [secret, setSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [limitScore, setLimitScore] = useState("");
  const [limitParticipants, setLimitParticipants] = useState("");
  const [password, setPassword] = useState("");

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = `64px`;
    if (textRef.current.scrollHeight < 128) {
      textRef.current.style.height = `64px`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  /* --------------------------------- 입력값 메세지 -------------------------------- */
  const [isLimitScore, setIsLimitScore] = useState("");
  const [isLimitParticipants, setIsLimitParticipants] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [isContent, setIsContent] = useState("");
  const [isdate, setIsDate] = useState("");

  /* ----------------------------- 입력값 할당 및 유효성 검사 ---------------------------- */
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setIsTitle(formValid("title", e.target.value));
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
    setIsContent(formValid("content", e.target.value));
  };

  const onChangelimitScore = (e) => {
    if (/^[1-9][0-9]?$|^100/.test(e.target.value) || e.target.value === "") {
      setLimitScore(e.target.value);
    }
    setIsLimitScore(formValid("limitScore", e.target.value, limitParticipants));
  };

  const onChangelimitParticipants = (e) => {
    if (/^([1-9]|10)$/.test(e.target.value) || e.target.value === "") {
      setLimitParticipants(e.target.value);
    }
    setIsLimitParticipants(formValid("limitParticipants", e.target.value, limitScore));
    if (parseInt(limitScore) < parseInt(e.target.value)) {
      setIsLimitScore("목표달성 수를 참가인원 수 이상, 100개 이하로 입력해 주세요.");
    } else setIsLimitScore("");
  };

  const validation = () => {
    if (!/^([1-9]|10)$/.test(limitParticipants)) {
      setIsLimitParticipants("참가인원을 입력해 주세요(10명 이내)");
    } else setIsLimitParticipants("");
    if (!/^[1-9][0-9]?$|^100/.test(limitScore) || parseInt(limitScore) < parseInt(limitParticipants)) {
      setIsLimitScore("목표달성 수를 참가인원 수 이상, 100개 이하로 입력해 주세요.");
    } else setIsLimitScore("");
    if (!dates.start?.length && !dates.end?.length) {
      setIsDate("진행기간을 선택해 주세요.");
    } else setIsDate("");
    if (!title.trim().length) {
      setIsTitle("그룹명을 입력해 주세요");
    } else setIsTitle("");
    if (!content.trim().length) {
      setIsContent("그룹 소개를 입력해주세요");
    } else setIsContent("");
  };

  /* --------------------------------- 사진 업로드 --------------------------------- */
  const [imageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [isPhotoMessage, setIsPhotoMessage] = useState("");
  const [upLoading, setUploading] = useState(100);

  const addImageFile = async (e) => {
    setIsPhotoMessage("");
    const acceptImageFiles = ["image/png", "image/jpeg", "image/jpg"];
    const imageFile = e.target.files[0];
    if (acceptImageFiles.includes(imageFile.type)) {
      if (imageFile.size < 21000000) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (data) => {
            setUploading(data);
          },
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          let reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          setImageFile(compressedFile);
          reader.onloadend = () => {
            const previewImgUrl = reader.result;
            setPreviewImg([previewImgUrl]);
          };
          const convertedBlobFile = new File([compressedFile], imageFile.name, { type: imageFile.type, lastModified: Date.now() });
          setImageFile(convertedBlobFile);
        } catch (error) {
          setIsPhotoMessage("오류가 발생했습니다. 다시 업로드해주세요.");
        }
      } else setIsPhotoMessage("20mb이상의 이미지만 가능합니다.");
    } else setIsPhotoMessage("지원하지 않는 파일 형식입니다.");
  };

  const OnClickDeleteImage = () => {
    setPreviewImg([]);
    setImageFile([]);
    setIsPhotoMessage("");
  };

  /* ----------------------------------- 제출 ----------------------------------- */
  const submitcheck = () => {
    if (toDay === dates.start) {
      setFormModal(!formmodal);
    } else submitHandler();
  };

  const submitHandler = async () => {
    let formData = new FormData();
    const dataSet = {
      title: title.trim(),
      content: content.trim(),
      limitParticipants: limitParticipants,
      limitScore: limitScore,
      password: password,
      secret: secret,
      startDate: start,
      endDate: end,
    };
    formData.append("multipartFile", imageFile);
    formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
    await dispatch(postCommunityDetail(formData)).then((response) => {
      if (!response.error) {
        navigate(`/`);
      }
    });
    await dispatch(clearVal());
  };

  const [formmodal, setFormModal] = useState(false);

  // modal text data
  const confirmModalData = {
    title: "그룹 캠페인이 시작되면 수정 및 삭제가 불가능합니다. 등록하시겠습니까?",
    cancel: "아니오",
    submit: "예",
  };

  // editMode cancel function
  const clickSubmit = () => {
    submitHandler();
  };

  const modalOnOff = () => {
    setFormModal(!formmodal);
  };

  useEffect(() => {
    return () => {
      imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
      dispatch(addDates({}));
    };
  }, []);

  /* ----------------------------------- 로딩 ----------------------------------- */

  if (isLoading) {
    return (
      <>
        <ImageLoadingWrap>
          <ImageLoading color="rgba(0, 0, 0, 0.13)" />
        </ImageLoadingWrap>
      </>
    );
  }

  const formData = {
    upLoading: upLoading,
    previewImg: previewImg,
    addImageFile: addImageFile,
    OnClickDeleteImage: OnClickDeleteImage,
    isPhotoMessage: isPhotoMessage,
    textRef: textRef,
    handleResizeHeight: handleResizeHeight,
    title: title,
    onChangeTitle: onChangeTitle,
    isTitle: isTitle,
    dates: dates,
    toDay: toDay,
    isdate: isdate,
    limitParticipants: limitParticipants,
    onChangelimitParticipants: onChangelimitParticipants,
    isLimitParticipants: isLimitParticipants,
    limitScore: limitScore,
    isLimitScore: isLimitScore,
    onChangelimitScore: onChangelimitScore,
    content: content,
    onChangeContent: onChangeContent,
    isContent: isContent,
    submitcheck: submitcheck,
    validation: validation,
  };

  /* ----------------------------------- 로딩 ----------------------------------- */

  if (isLoading) {
    return (
      <>
        <ImageLoadingWrap>
          <ImageLoading color="rgba(0, 0, 0, 0.13)" />
        </ImageLoadingWrap>
      </>
    );
  }

  return (
    <>
      {formmodal && <ConfirmSingleModal confirmModalData={confirmModalData} clickSubmit={clickSubmit} closeModal={modalOnOff} />}
      {isLogin() ? null : <IsLoginModal />}
      {error && <ErrorModal notGo={true} error={error} />}
      <Form formData={formData} />
    </>
  );
};

export default CommunityForm;

/* ----------------------------------- 로딩 ----------------------------------- */

const ImageLoadingWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 15px;
  box-sizing: border-box;
`;
