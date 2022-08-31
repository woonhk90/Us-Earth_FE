import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import useInputs from "./useInputs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postFormData } from "../hooks/Query";

const Form = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isSecret, setIsSecret] = useState(false);
  const [files, setFiles] = useState([]);
  const [inputData, inputOnChangeHandler, inputReset] = useInputs({
    limitScore: "",
    limitParticipants: "",
    title: "",
    content: "",
  });
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const { limitScore, limitParticipants, title, content } = inputData;
  console.log(files);

  //query
  const queryClient = useQueryClient();
  const { mutate: addMutateData } = useMutation((data) => postFormData(data), {
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

  const pwOnChangeHandler = (e) => {
    const passwordRegex = /^([0-9]){4}$/;
    const passwordCurrent = e.target.value;
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자 4자리를 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  //사진
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
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

  const secretToggleHandler = useCallback(() => {
    if (isSecret === false) {
      setPassword("");
      setIsPassword(false);
      setIsSecret(true);
    } else {
      setIsSecret(false);
      setIsPassword(false);
    }
  }, [isSecret]);

  const submitHandler = () => {
    let formData = new FormData();
    if (title === "") {
      alert("제목을 입력해 주세요");
    } else if (content === "") {
      alert("내용을 입력해 주세요");
    } else if (limitScore === "") {
      alert("목표수을 입력해 주세요");
    } else if (limitParticipants === "") {
      alert("모집인원을 선택해 주세요");
    } else if (isSecret !== isPassword) {
      console.log(isSecret, "isPassword", isPassword);
      alert("패스워드를 알맞게 입력해주세요");
    } else {
      const dataSet = {
        ...inputData,
        password: password,
        isSecret: isSecret,
        startDate: "",
        endDate: "",
      };
      for (let i = 0; i < 2; i++) {
        const year = dateRange[i].getFullYear();
        const month = ("0" + (dateRange[i].getMonth() + 1)).slice(-2);
        const days = ("0" + dateRange[i].getDate()).slice(-2);
        const dateString = year + "-" + month + "-" + days;
        if (i === 0 ? (dataSet.startDate = dateString) : (dataSet.endDate = dateString));
      }
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
      <div>게시글 작성</div>
      <div>이미지</div>
      <Container>
        <input {...getInputProps()} />
        <StButton {...getRootProps()}>
          <Length>{files.length}/5</Length>
        </StButton>
        <ThumbsContainer>{thumbs}</ThumbsContainer>
        <div>{fileRejectionItems}</div>
      </Container>
      <div>모집기간: 작성일자~진행기간</div>
      <div>진행기간*</div>
      <StInput>
        <DatePicker
          renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
            <div>
              <button
                className={"react-datepicker__navigation react-datepicker__navigation--previous"}
                style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                onClick={decreaseMonth}
              >
                <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"}>{"<"}</span>
              </button>
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString("KO", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <button
                className={"react-datepicker__navigation react-datepicker__navigation--next"}
                style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                onClick={increaseMonth}
              >
                <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"}>{">"}</span>
              </button>
            </div>
          )}
          shouldCloseOnSelect={false}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          locale={ko}
          // monthFormat="yy월 MM"
          dateFormat="yyyy-MM-dd"
          onChange={(update) => {
            setDateRange(update);
          }}
          withPortal
          disabledKeyboardNavigation
        />
      </StInput>
      <div>참여인원*</div>
      <input type="number" name="limitParticipants" value={limitParticipants} onChange={inputOnChangeHandler}></input>
      <div>목표글수*</div>
      <input type="number" name="limitScore" value={limitScore} onChange={inputOnChangeHandler}></input>
      <div>비밀방 여부</div>
      <CheckBoxWrapper>
        <CheckBox onClick={secretToggleHandler} id="checkbox" type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      {isSecret ? (
        <>
          <div>비밀번호</div>
          <input placeholder="숫자 4자리를 입력해주세요" maxLength="4" value={password} onChange={pwOnChangeHandler} type="password"></input>
          {password.length > 0 && <span>{passwordMessage}</span>}
        </>
      ) : null}

      <div>그룹제목*</div>
      <input name="title" value={title} onChange={inputOnChangeHandler}></input>
      <div>내용*</div>
      <textarea name="content" value={content} onChange={inputOnChangeHandler}></textarea>
      <div>카테고리</div>
      <button onClick={submitHandler}>등록</button>
    </>
  );
};
export default Form;

const StInput = styled.div`
  > div > div > input {
    width: 200px;
  }
  .react-datepicker {
    border: none;
  }
  .react-datepicker__header {
    background-color: #e4ffe4;
    border: none;
  }
  .react-datepicker__current-month {
    font-size: 16px;
  }
  .react-datepicker__day--in-range {
    border-radius: 0;
    background-color: #21a549;
  }
  .react-datepicker__day {
    margin: 5px 0 0 0;
  }
  .react-datepicker__day--range-end {
    border-radius: 0px 50% 50% 0px;
  }
  .react-datepicker__day:hover {
    /* border-radius: 50%; */
  }
  .react-datepicker__day--in-selecting-range {
    border-radius: 50%;
    background-color: rgba(33, 165, 33, 0.5);
  }
  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: black;
  }
  .react-datepicker__day--range-start {
    border-radius: 50% 0 0 50%;
    background-color: #21a549;
    color: white;
  }
  & .SingleDatePicker,
  .SingleDatePickerInput {
    .DateInput {
      width: 100%;
      height: 40px;
      display: flex;

      .DateInput_input {
        font-size: 1rem;
        border-bottom: 0;
        padding: 12px 16px 14px;
      }
    }

    .SingleDatePickerInput__withBorder {
      border-radius: 4px;
      overflow: hidden;

      :hover,
      .DateInput_input__focused {
        border: 1px solid red;
      }

      .CalendarDay__selected {
        background: blue;
        border: blueviolet;
      }
    }

    .SingleDatePicker_picker.SingleDatePicker_picker {
      top: 43px;
      left: 2px;
      /* top: 43px !important;
      left: 2px !important; */
    }
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 43px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 1px;
    background: #ffffff;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #35bd47;
    &::after {
      background-color: white;
      display: block;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      margin: 1px 0 0 20px;
      transition: 0.2s;
    }
  }
`;

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

const AddButton = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 20px auto;
  padding-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ff8a3d;
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
