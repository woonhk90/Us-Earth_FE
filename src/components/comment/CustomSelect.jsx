import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as WidthDot } from "../../assets/widthDot.svg";
import { ReactComponent as Setting } from "../../assets/Setting.svg";
import { flexRow } from "../../styles/Flex";
import styled from "styled-components";

const CustomSelect = ({ selectBoxData, contentId, clickDispatch, optionIcon }) => {
  const modalRef = useRef();

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
    clickDispatch({
      contentId: contentId,
      selectName: e.target.innerText,
    });
  };

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <SelectBox ref={modalRef} onClick={() => setShowOptions(!showOptions)}>
        {optionIcon ? (
          <IconRight>
            <Setting />
          </IconRight>
        ) : (
          <EditIcon>
            <WidthDot />
          </EditIcon>
        )}
        <SelectOptions optionIcon show={showOptions}>
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

const SelectOptions = styled.ul`
  text-align: center;
  position: absolute;
  z-index: 9999;
  list-style: none;
  top: ${(props) => (props.optionIcon ? "30px" : "20px")};
  right: 0;
  overflow: hidden;
  border: ${(props) => (props.show ? "1px solid rgba(217, 217, 217, 0.5)" : "none")};
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 6px;
  li:not(:first-child) {
    border-top: 1px solid rgba(217, 217, 217, 0.5);
  }
`;

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
  position: absolute;
  top: -10px;
  right: 0px;
  font-size: 20px;
`;

const IconRight = styled.div`
  cursor: pointer;
  width: 28px;
  height: 29px;
`;
