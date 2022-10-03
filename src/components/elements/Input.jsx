import styled, { css } from "styled-components";

const Input = (props) => {
  const { onInput, inputype, fontWeight, maxLength, pattern, title, size, id, type, value, name, onChange, placeholder, margin } = props;
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
        onInput={onInput}
      />
    </InputWrap>
  );
};

export default Input;

const InputWrap = styled.div``;

const StInput = styled.input`
  width: 100%;
  border: none;
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  outline: none;
  color: #222222;
  letter-spacing: -0.02em;
  ::placeholder {
    color: #cbcbcb;
  }
  ${(props) => {
    return (
      props.inputype === "basic" &&
      css`
        box-sizing: border-box;
        margin: 0;
        font-size: 22px;
        padding: 5px 0 26px 0;
        font-weight: 700;
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
  ${(props) => {
    return (
      props.inputype === "nick" &&
      css`
        box-sizing: border-box;
        margin: 0;
        font-size: 16px;
        padding: 5px 0 15px 0;
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
