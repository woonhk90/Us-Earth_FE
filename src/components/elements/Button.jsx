import styled, { css } from "styled-components";
import icons from "../../assets";

const Button = ({ imgUrl, on, font, outline, border, margin, height, width, btnType, type, onClick, children, disabled, svgType }) => {
  const { Back, Question, Cancel, Setting } = icons;
  return (
    <StButton
      font={font}
      outline={outline}
      border={border}
      margin={margin}
      height={height}
      width={width}
      type={type}
      onClick={onClick}
      btnType={btnType}
      disabled={disabled}
      on={on}
      imgUrl={imgUrl}
      svgType={svgType}
    >
      {children}
      {svgType === "back" && <Back width="12px" height="21px" />}
      {svgType === "question" && <Question width="28px" height="29px" />}
      {svgType === "cancel" && <Cancel width="21px" height="21px" />}
      {svgType === "setting" && <Setting width="28px" height="29px" />}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  cursor: pointer;
  color: black;
  ${(props) => {
    return (
      props.btnType === "onOff" &&
      css`
        background-color: transparent;
        border: transparent;
        color: ${(props) => (props.on === "on" ? "#222222" : "#CBCBCB")};
        justify-content: center;
        align-items: center;
        height: 78px;
        width: 100%;
        border-bottom: ${(props) => (props.on === "on" ? "6px solid #8ecf70" : "6px solid #F5F5F5")};
        font-size: 20px;
        font-weight: 600;
        box-sizing: border-box;
        :hover {
          border: ${({ border }) => `${border}`};
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "submit" &&
      css`
        width: 100%;
        border: none;
        line-height: 56px;
        font-weight: 600;
        font-size: 20px;
        color: ${(props) => (props.on === "on" ? "white" : "#BEBEBE")};
        background-color: ${(props) => (props.on === "on" ? "#315300" : "#EDEDED")};
        cursor: ${(props) => (props.on === "on" ? "pointer" : "default")};
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "svg" &&
      css`
        height: 100%;
        background-color: transparent;
        border: none;
        display: flex;
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "modal" &&
      css`
        border: none;
        border-top: 2px solid rgba(217, 217, 217, 0.3);
        width: 100%;
        padding: 17px 0;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: ${(props) => (props.on === "on" ? "#B9B9B9" : "#212121")};
   
      `
    );
  }}
`;
