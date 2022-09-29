import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { ReactComponent as WidthDot } from "../../assets/widthDot.svg";
import { commentSelectBox } from "../../redux/modules/commentsSlice";
import { flexRow } from "../../styles/Flex";
// import "./Modal.css";

const CustomSelect = ({ selectBoxData, contentId, clickDispatch }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    window.addEventListener("mousedown", clickModalOutside);

    return () => {
      window.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (showOptions && !modalRef.current.contains(event.target)) {
      setShowOptions(!showOptions);
    }
  };

  const onClickselectValue = (e) => {
    setSelectValue(e.target.innerText);
    clickDispatch({
      contentId: contentId,
      selectName: e.target.innerText,
    });
  };

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <SelectBox ref={modalRef} onClick={() => setShowOptions(!showOptions)}>
        <EditIcon>
          <WidthDot />
        </EditIcon>
        <SelectOptions show={showOptions}>
          {selectBoxData.map((button) => (
            <Option key={button.id} onClick={onClickselectValue}>
              {button.icon}
              {button.selectName}
            </Option>
          ))}
        </SelectOptions>
      </SelectBox>
    </>
  );
};

export default CustomSelect;

const SelectBox = styled.div`

  position: relative;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  align-self: center;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
  }
`;
const Label = styled.label`
  width: 110px;
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul`
  /* list-style: none; */
  text-align: center;
  /* background-color: #ffffff; */
  
  position: absolute;
  z-index: 9999;
  list-style: none;
  top: 20px;
  right: 0;
  overflow: hidden;
  border: ${(props) => (props.show ? "1px solid rgba(217, 217, 217, 0.5)" : "none")};
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 6px;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  /* background-color: #222222; */
  li:not(:first-child) {
    border-top: 1px solid rgba(217, 217, 217, 0.5);
  }
`;

//내부 옵션바 텍스트
const Option = styled.li`
  background-color: #ffffff;
  ${flexRow}
  width: 125px;
  font-size: 16px;
  padding: 13px 8px;
  justify-content: center;
  vertical-align: middle;
  transition: background-color 0.2s ease-in;
`;

const EditIcon = styled.div`
  width: 18px;
  box-sizing: border-box;
  /* padding: 0 5px 12px 0; */
  position: absolute;

  /* padding:2px; */
  top: -10px;
  right: 0px;
  color: #49c181;
  font-size: 20px;
`;
