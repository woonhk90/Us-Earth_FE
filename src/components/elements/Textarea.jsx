import React from "react";
import styled, { css } from "styled-components";

const Textarea = (props) => {
  const { textareaType, margin, weight, autoFocus, size, maxLength, title, id, name, value, onChange, placeholder, height } = props;

  return (
    <TextareaWrap>
      <StTextarea
        autoFocus={autoFocus}
        maxLength={maxLength}
        title={title}
        id={id}
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        height={height}
        size={size}
        weight={weight}
        margin={margin}
        textareaType={textareaType}
      />
    </TextareaWrap>
  );
};

export default Textarea;

const TextareaWrap = styled.div`
  width: 100%;
`;

const StTextarea = styled.textarea`
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;
  box-sizing: border-box;
  letter-spacing: -0.02em;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  width: 100%;
  outline: none;
  color: #424242;
  ::placeholder {
    color: #cbcbcb;    
  }
  ${(props) => {
    return (
      props.textareaType === "basic" &&
      css`
        margin: 17px 0 0 0;
        font-weight: 500;
        height: 150px;
        font-size: 18px;
      `
    );
  }}
`;
