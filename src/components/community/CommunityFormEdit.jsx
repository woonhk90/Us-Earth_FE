import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useInputs from "../../hooks/useInputs";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { flexBetween, flexColumn } from "../../styles/Flex";
import { addDates, communityFormCleanUp, communityFormcleanUp, patchCommunityDetail } from "../../redux/modules/communityFormSlice";
import { useNavigate, useParams } from "react-router-dom";
import cameraWh from "../../assets/cameraWh.svg";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../Modals/IsLoginModal";
import imageCompression from "browser-image-compression";
import ImageLoading from "../etc/ImageLoading";
import ErrorModal from "../Modals/ErrorModal";
import SeceletonFormEdit from "./SceletonFormEdit";
import { tokenInstance } from "../../api/axios";

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
      setTitle(data.title)
      setContent(data.content)
      setLimitScore(data.limitScore)
      setLimitParticipants(data.limitParticipants)

      dispatch(
        addDates({
          start: data.startDate,
          end: data.endDate,
        })
      );
      setPreviewImg([data.img]);
      setIsPassword(data.secret);
    } catch (error) {
      setGetError(error.response.data.message);
    }
    setIsGetLoading(false);
  };

  /* ----------------------------------- 달력 ----------------------------------- */
  const { dates } = useSelector((state) => state.communityForm);
  const { start, end } = dates;
  const [modal, setModal] = useState(false);

  /* ----------------------------------- 입력값 ---------------------------------- */
  const [secret, setSecret] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [limitScore, setLimitScore] = useState("");
  const [limitParticipants, setLimitParticipants] = useState("");
  const [password, setPassword] = useState("");
  
  /* --------------------------------- 입력값 메세지 -------------------------------- */
  const [isLimitScore, setIsLimitScore] = useState("");
  const [isLimitParticipants, setIsLimitParticipants] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [isContent, setIsContent] = useState("");
  const [isdate, setIsDate] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  /* ----------------------------- 입력값 할당 및 유효성 검사 ---------------------------- */
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() === "") {
      setIsTitle("그룹명을 입력해 주세요");
    } else setIsTitle("");
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
    if (e.target.value.trim() === "") {
      setIsContent("그룹 소개를 입력해주세요");
    } else setIsContent("");
  };

  const onChangelimitScore = (e) => {
    if (/^[1-9][0-9]?$|^100/.test(e.target.value) || e.target.value === "") {
      setLimitScore(e.target.value);
    }
    if (e.target.value === "" || parseInt(e.target.value) < parseInt(limitParticipants)) {
      setIsLimitScore("목표달성 수를 참가인원 수 이상, 100개 이하로 입력해 주세요.");
    } else setIsLimitScore("");
  };

  const onChangelimitParticipants = (e) => {
    if (/^([1-9]|10)$/.test(e.target.value) || e.target.value === "") {
      setLimitParticipants(e.target.value);
    }
    if (e.target.value === "") {
      setIsLimitParticipants("참가인원을 입력해 주세요(10명 이내)");
    } else setIsLimitParticipants("");
    if (parseInt(limitScore) < parseInt(e.target.value)) {
      setIsLimitScore("목표달성 수를 참가인원 수 이상, 100개 이하로 입력해 주세요.");
    } else setIsLimitScore("");
  };

  const validation = () => {
    if (!/^([0-9]){4}$/.test(password)) {
      setPasswordMessage("비밀번호 숫자 4자리");
    } else setPasswordMessage("");
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
  };

  /* --------------------------- password validation -------------------------- */
  // const pwOnChangeHandler = (e) => {
  //   const passwordRegex = /^([0-9]){4}$/;
  //   const passwordCurrent = e.target.value;
  //   setPassword(e.target.value);
  //   if (!passwordRegex.test(passwordCurrent)) {
  //     setPasswordMessage("비밀번호 숫자 4자리");
  //     setIsPassword(false);
  //   } else {
  //     setPasswordMessage("");
  //     setIsPassword(true);
  //   }
  // };

  /* -------------------------- secret switch button -------------------------- */
  // const secretSwitchButtonHandler = () => {
  //   if (secret === false) {
  //     setPassword("");
  //     setIsPassword(false);
  //     setSecret(true);
  //   } else {
  //     setSecret(false);
  //     setIsPassword(false);
  //     setPassword("");
  //   }
  // };

/* ----------------------------------- 제출 ----------------------------------- */
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
        navigate(`/community/detail/${param.id}`);
      }
    });
  };

  useEffect(() => {
    getCommunityDetail(param.id);
    return () => {
      dispatch(communityFormCleanUp());
      imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

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
      <>
        <ImageLoadingWrap>
          <ImageLoading color="rgba(0, 0, 0, 0.13)" />
        </ImageLoadingWrap>
      </>
    );
  }

  return (
    <>
      {error && <ErrorModal notGo={true} error={error} />}
      {isLogin() ? null : <IsLoginModal />}
      <CommunityFormWrap>
        <ImageBoxWrap>
          <ImageForm encType="multipart/form-data">
            <label htmlFor={upLoading < 100 ? null : "file"}>
              <ImageIcon>
                {upLoading < 100 ? (
                  <Container>
                    <LoadingPosition>
                      <ImageLoading />
                    </LoadingPosition>
                  </Container>
                ) : null}
                {previewImg.length > 0 ? <Thumb src={previewImg} alt="img" /> : <CameraIcon />}
                <BottonTextWrap>
                  <BottomText>대표이미지</BottomText>
                </BottonTextWrap>
              </ImageIcon>
            </label>
            <ImageInput
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => {
                addImageFile(e);
                e.target.value = "";
              }}
            />
          </ImageForm>
          <TextWrap>
            <DeleteImage onClick={OnClickDeleteImage}>기본 이미지로 변경</DeleteImage>
            <ErrorMessage>{isPhotoMessage}</ErrorMessage>
          </TextWrap>
        </ImageBoxWrap>
        {/* <RightText>비공개</RightText> */}
        <TopTextWrap>
          <P>그룹명*</P>
          {/* <CheckBoxWrapper>
            <CheckBox secret={secret} onClick={secretSwitchButtonHandler} id="checkbox" type="checkbox" />
            <CheckBoxLabel secret={secret} htmlFor="checkbox" />
          </CheckBoxWrapper> */}
        </TopTextWrap>
        <InputWrap>
          <Input maxLength="30" inputype="basic" placeholder="그룹명을 입력해 주세요" name="title" value={title} onChange={onChangeTitle}></Input>
          <MessageP>{isTitle}</MessageP>
        </InputWrap>
        {/* {secret ? (
          <>
            <P>비밀번호</P>
            <InputWrap>
              <Input
                inputype="basic"
                placeholder="비밀번호를 입력해 주세요"
                maxLength="4"
                value={password}
                onChange={pwOnChangeHandler}
                type="password"
              ></Input>
              <MessageP>{passwordMessage}</MessageP>
            </InputWrap>{" "}
          </>
        ) : null} */}
        <div
          onClick={() => {
            setModal(!modal);
          }}
        >
          <P>진행 기간*</P>
          {dates.start?.length > 0 && dates.end?.length > 0 ? (
            <SelectDateP color={"#222222"}>
              {dates.start}-{dates.end}
            </SelectDateP>
          ) : (
            <>
              <DateP color={"#CBCBCB"}>날짜를 선택해 주세요.</DateP>
              <MessageP>{isdate}</MessageP>
            </>
          )}
        </div>
        {modal && <CalendarModal closeModal={() => setModal(!modal)}></CalendarModal>}
        <P>참여인원*</P>
        <InputWrap>
            <Input
              inputype="basic"
              maxLength="2"
              placeholder="인원을 입력해 주세요(최대 10명)"
              type="tel"
              name="limitParticipants"
              value={limitParticipants}
              onChange={onChangelimitParticipants}
            ></Input>
            <MessageP>{isLimitParticipants}</MessageP>
          </InputWrap>
          <P>목표달성 수*</P>
          <InputWrap>
            <Input
              inputype="basic"
              maxLength="3"
              type="tel"
              name="limitScore"
              placeholder="목표달성 수를 입력해주세요(최대 100)"
              value={limitScore}
              onChange={onChangelimitScore}
            ></Input>
            <MessageP limitScore={true}>{isLimitScore}</MessageP>
          </InputWrap>
          <P>그룹소개*</P>
          <InputWrap>
            <Textarea
              placeholder="소개글을 입력해 주세요"
              cols="50"
              rows="8"
              maxLength="255"
              name="content"
              textareaType="basic"
              value={content}
              onChange={onChangeContent}
            ></Textarea>
            <MessageP bottom={true}>{isContent}</MessageP>
          </InputWrap>
        </CommunityFormWrap>
        <BottomWrap>
          {/^([1-9]|10)$/.test(limitParticipants) &&
          /^[1-9][0-9]?$|^100/.test(limitScore) &&
          parseInt(limitScore) >= parseInt(limitParticipants) &&
          title.trim() !== "" &&
          content.trim() !== "" &&
          dates.end?.length > 0 &&
          secret === isPassword ? (
            <BottomButton
              style={{
                cursor: "pointer",
              }}
              onClick={submitHandler}
              bgColor={"#315300"}
              color={"white"}
            >
              그룹 등록
            </BottomButton>
          ) : (
            <BottomButton onClick={validation} bgColor={"#EDEDED"} color={"#BEBEBE"}>
              그룹 등록
            </BottomButton>
          )}
        </BottomWrap>
    </>
  );
};

export default CommunityFormEdit;

const CommunityFormWrap = styled.div`
  margin: 51px 16px 60px 16px;
`;

/* ----------------------------------- image ---------------------------------- */
const ImageBoxWrap = styled.div`
  ${flexColumn}
`;

const ImageForm = styled.form`
  width: 206px;
  height: 206px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

const ImageIcon = styled.div`
  cursor: pointer;
  width: 206px;
  height: 206px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 14px;
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  background-size: contain;
  background-position: center;
  width: 206px;
  height: 206px;
  border-radius: 14px;
  z-index: 999;
  background-color: #cbcbcb;
  align-items: center;
`;

const LoadingPosition = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Thumb = styled.img`
  background-size: contain;
  background-position: center;
  width: 206px;
  height: 206px;
  border-radius: 14px;
  position: absolute;
  z-index: 1;
  background-color: white;
`;

const CameraIcon = styled.div`
  width: 92px;
  height: 74px;
  background-image: url("${cameraWh}");
  background-repeat: no-repeat;
  background-size: 92px;
  color: transparent;
  background-position: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BottonTextWrap = styled.div`
  position: absolute;
  align-items: center;
  box-sizing: border-box;
  padding: 11px 0;
  text-align: center;
  margin: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 39px;
  border: none;
  border-radius: 0 0 14px 14px;
  z-index: 0;
  background: #cbcbcb;
  background-size: 100%;
  display: flex;
`;

const BottomText = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const ImageInput = styled.input`
  width: 0;
  height: 0;
  overflow: hidden;
  cursor: pointer;
`;

const TextWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteImage = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  background-color: transparent;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: #9b9b9b;
  margin-bottom: 28px;
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 0px;
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #ff0000;
`;

/* -------------------------------- 비밀번호, 그룹명 ------------------------------- */

const RightText = styled.p`
  font-size: 18px;
  text-align: right;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const TopTextWrap = styled.div`
  ${flexBetween}
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 54px;
  height: 29px;
  border-radius: 15px;
  background: #cbcbcb;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin: 2px 0px 0px 2px;
    background: #ffffff;
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 54px;
  height: 29px;
  &:checked + ${CheckBoxLabel} {
    background: #80bc28;
    &::after {
      background-color: white;
      display: block;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      margin: 2px 0px 2px 27px;
      transition: 0.2s;
    }
  }
`;

const BottomWrap = styled.div`
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
  display: flex;
  text-align: center;
`;

const BottomButton = styled.button`
  width: 100%;
  border: none;
  line-height: 56px;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

/* ----------------------------------- 입력값 ---------------------------------- */

const P = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
  margin-top: 20px;
`;

const InputWrap = styled.div`
  position: relative;
`;

const MessageP = styled.p`
  font-weight: 200;
  font-size: 14px;
  line-height: 19px;
  position: absolute;
  right: 0;
  bottom: ${(props) => (props.bottom ? "10px" : "5px")};
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.02em;
  color: #ff0000;

  @media (max-width: 389px) {
    ${(props) =>
      props.limitScore &&
      css`
        font-size: 12px;
        bottom: 3px;
        line-height: 14px;
      `}
  }
`;

/* ---------------------------------- 진행기간 ---------------------------------- */

const SelectDateP = styled.p`
  box-sizing: content-box;
  height: 32px;
  margin: 0;
  font-size: 22px;
  padding: 10px 0 26px 0;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  color: ${(props) => props.color};

  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

const DateP = styled.p`
  box-sizing: content-box;
  height: 35px;
  margin: 0;
  font-size: 22px;
  padding: 5px 0 26px 0;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  color: ${(props) => props.color};

  @media (min-width: 281px) and (max-width: 389px) {
    font-size: 16px;
  }
  @media (max-width: 280px) {
    font-size: 14px;
  }
`;

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
