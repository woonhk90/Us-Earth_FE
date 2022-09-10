import styled from "styled-components";

const Input = (props) => {
  const { maxLength, pattern, title, size, id, type, value, name, onChange, placeholder, margin } = props;
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
      />
    </InputWrap>
  );
};

export default Input;

const InputWrap = styled.div``;

const StInput = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.size};
  border-bottom: 1px solid rgb(238, 238, 238);
  word-wrap: break-word;
  box-sizing: border-box;
  border: none;
  display: flex;
  height: 46px;
  padding: 12px;
  outline: none;
  :hover {
  }
`;
