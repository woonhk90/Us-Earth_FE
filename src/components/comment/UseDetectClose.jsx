import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
// import "./Modal.css";

const CustomSelect = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };

  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      {/* <Label>{currentValue}</Label> */}
      <SelectOptions show={showOptions}>
        <Option onClick={handleOnChangeSelectValue}>수정하기</Option>
        <Option onClick={handleOnChangeSelectValue}>삭제하기</Option>
        <Option onClick={handleOnChangeSelectValue}>신고하기</Option>
      </SelectOptions>
    </SelectBox>
  );
};

export default CustomSelect;

const SelectBox = styled.div`
  position: relative;
  width: 20px;
  padding: 8px;
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;
const Label = styled.label`
  width: 110px;
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul`
  width: 75px;
  position: absolute;
  list-style: none;
  top: 18px;
  right: 0;
  overflow: hidden;
  /* height: 90px; */
  height: 60px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  /* background-color: #222222; */
`;

//내부 옵션바 텍스트
const Option = styled.li`
  width: 90px;
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #dedede;
  }
`;
