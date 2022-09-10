import React from "react";
import styled from "styled-components";

const Textarea = (props) => {
  const { size, maxLength, title, id, name, value, onChange, placeholder, height } = props;

  return (
    <TextareaWrap>
      <StTextarea
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
  border: none;
  border-bottom: 1px solid rgb(238, 238, 238);
  width: 100%;
  height: ${({ height }) => `${height}`};
  /* padding: 12px; */
  /* border-radius: 8px; */
  font-size: ${({ size }) => `${size}`};
  outline: none;
  :hover {
  }
`;
