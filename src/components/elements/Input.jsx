import styled, { css } from "styled-components";

const Input = (props) => {
  const { inputype, fontWeight, maxLength, pattern, title, size, id, type, value, name, onChange, placeholder, margin } = props;
  return (
    <InputWrap>
      <StInput
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        id={id}
        type={type}
        value={value}
        name={name}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        margin={margin}
        fontWeight={fontWeight}
        inputype={inputype}
      />
    </InputWrap>
  );
};

export default Input;

const InputWrap = styled.div``;

const StInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  outline: none;
  color: #424242;
  letter-spacing: -0.02em;
  ::placeholder {
    color: #cbcbcb;
  }
  ${(props) => {
    return (
      props.inputype === "basic" &&
      css`
        box-sizing: content-box;
        height: 35px;
        margin: 0;
        font-size: 22px;
        padding: 10px 0 26px 0;
        font-weight: 700;
      `
    );
  }}
`;
