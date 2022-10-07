import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addDates, communityFormCleanUp, patchCommunityDetail } from "../../redux/modules/communityFormSlice";
import { useNavigate, useParams } from "react-router-dom";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../Modals/IsLoginModal";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";
import ErrorModal from "../Modals/ErrorModal";
import SeceletonFormEdit from "./SceletonFormEdit";
import { tokenInstance } from "../../api/axios";
import dayjs from "dayjs";
import ConfirmSingleModal from "../Modals/ConfirmSingleModal";
import { formValid } from "../../utils/formValid";
import Form from "./Form";

const CommunityFormEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { isLoading, error } = useSelector((state) => state.communityForm);

  /* -------------------------------- axios get ------------------------------- */

  const [isGetLoading, setIsGetLoading] = useState(false);
  const [getError, setGetError] = useState(null);
  const getCommunityDetail = async (communityId) => {
    try {
      setGetError(null);
      setIsGetLoading(true);
      const { data } = await tokenInstance.get(`/community/${communityId}`);
      if (!data.writer) navigate("/community");
      setSecret(data.secret);
      setPassword(data.password);
      setTitle(data.title);
      setContent(data.content);
      setLimitScore(data.limitScore);
      setLimitParticipants(data.limitParticipants);

      dispatch(
        addDates({
          start: data.startDate,
          end: data.endDate,
        })
      );
      setPreviewImg([data.img]);
    } catch (error) {
      setGetError(error.response.data.message);
    }
    setIsGetLoading(false);
  };

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
  const handleResizeHeight = () => {
    textRef.current.style.height = `64px`;
    if (textRef.current.scrollHeight < 128) {
      textRef.current.style.height = `64px`;
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  };

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
  const [deleteImage, setDeleteImage] = useState(false);

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

  const OnClickDeleteImage = (e) => {
    e.preventDefault();
    setPreviewImg([]);
    setImageFile([]);
    setDeleteImage(true);
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
      delete: deleteImage,
    };
    formData.append("multipartFile", imageFile);
    formData.append("dto", new Blob([JSON.stringify(dataSet)], { type: "application/json" }));
    await dispatch(patchCommunityDetail({ communityId: param.id, formData })).then((response) => {
      if (!response.error) {
        navigate(`/community/detail/${param.id}`, { replace: true });
      }
    });
  };

  /* ------------------------- 오늘 === 시작날짜 인 경우 확인 모달 ------------------------- */
  const [formmodal, setFormModal] = useState(false);

  const confirmModalData = {
    title: "그룹 캠페인이 시작되면 수정 및 삭제가 불가능합니다. 등록하시겠습니까?",
    cancel: "아니오",
    submit: "예",
  };

  const clickSubmit = () => {
    submitHandler();
  };

  const modalOnOff = () => {
    setFormModal(!formmodal);
  };

  useEffect(() => {
    getCommunityDetail(param.id);
    handleResizeHeight();
    return () => {
      dispatch(communityFormCleanUp());
      imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  useEffect(() => {
    handleResizeHeight();
  }, [title]);

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

  /* --------------------------------- 로딩 & 에러 -------------------------------- */

  if (isGetLoading) {
    return (
      <>
        <SeceletonFormEdit />
      </>
    );
  }

  if (getError) {
    return <ErrorModal error={error} />;
  }

  if (isLoading) {
    return (
      <ImageLoadingWrap>
        <ImageLoading color="rgba(0, 0, 0, 0.13)" />
      </ImageLoadingWrap>
    );
  }

  return (
    <>
      {formmodal && <ConfirmSingleModal confirmModalData={confirmModalData} clickSubmit={clickSubmit} closeModal={modalOnOff} />}
      {error && <ErrorModal notGo={true} error={error} />}
      {isLogin() ? null : <IsLoginModal />}
      <Form formData={formData} />
    </>
  );
};

export default CommunityFormEdit;

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
