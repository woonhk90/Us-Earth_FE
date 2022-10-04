import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../styles/color";

const Textarea = (props) => {
  const {
    onKeyPress,
    textareaRef,
    onInput,
    onFocus,
    textareaType,
    margin,
    weight,
    autoFocus,
    size,
    maxLength,
    title,
    id,
    name,
    value,
    onChange,
    placeholder,
    height,
  } = props;

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
        onKeyPress={onKeyPress}
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
  color: ${colors.black22};
  ::placeholder {
    color: ${colors.grayCB};
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
  ${(props) => {
    return (
      props.textareaType === "proof" &&
      css`
        margin: 15px 0 0 0;
        padding: 0 30px;
        font-weight: 400;
        height: 280px;
        max-height: 400px;
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
        height: 62px;
        max-height: 250px;
        font-weight: 600;
        @media (max-width: 389px) {
          font-size: 20px;
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.textareaType === "comment" &&
      css`
        padding: 10px 10px 0 10px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        border-radius: 6px;
        letter-spacing: -0.03em;
        ::placeholder {
          color: #939393;
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.textareaType === "communityForm" &&
      css`
        box-sizing: border-box;
        margin: 0;
        font-size: 22px;
        padding: 5px 0 26px 0;
        font-weight: 700;
        height: 64px;
        max-height: 250px;
        @media (min-width: 281px) and (max-width: 389px) {
          ::placeholder {
            font-size: 16px;
          }
        }
        @media (max-width: 280px) {
          ::placeholder {
            font-size: 14px;
          }
        }
      `
    );
  }}
`;
