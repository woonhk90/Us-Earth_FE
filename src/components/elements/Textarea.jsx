import React from "react";
import styled, { css } from "styled-components";

const Textarea = (props) => {
  const { textareaRef, onInput, onFocus, textareaType, margin, weight, autoFocus, size, maxLength, title, id, name, value, onChange, placeholder, height } = props;
console.log(props.ref)
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
        onFocus={onFocus}
        placeholder={placeholder}
        height={height}
        size={size}
        weight={weight}
        margin={margin}
        textareaType={textareaType}
        onInput={onInput}
        ref={textareaRef}
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
  width: 100%;
  outline: none;
  color: #222222;
  ::placeholder {
    color: #cbcbcb;
  }
  ${(props) => {
    return (
      props.textareaType === "basic" &&
      css`
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        margin: 17px 0 0 0;
        font-weight: 500;
        height: 150px;
        font-size: 18px;
      `
    );
  }}
  ${(props) => {
    return (
      props.textareaType === "proof" &&
      css`
        margin: 15px 0 0 0;
        padding: 0 30px;
        font-weight: 400;
        height: 300px;
        font-size: 18px;
      `
    );
  }}
  

  ${(props) => {
    return (
      props.textareaType === "proofTop" &&
      css`
        border-bottom: 2px solid rgba(217, 217, 217, 0.3);
        box-sizing: border-box;
        margin: 0;
        padding: 14px 30px;
        font-size: 24px;
        height:64px;
        font-weight: 600;
        
  /* @media (max-width: 390px) {
    font-size: 18px;
  } */
      `
    );
  }}
  ${(props) => {
    return (
      props.textareaType === "comment" &&
      css`
        /* height: 300px; */
        padding: 10px 10px 0 10px;
        font-weight: 400;
        font-size: 16px;
        border-radius: 6px;
        letter-spacing: -0.03em;
        ::placeholder {
          color: #939393;
        }
      `
    );
  }}
`;
