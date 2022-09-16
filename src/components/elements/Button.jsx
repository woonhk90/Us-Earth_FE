import styled, { css } from "styled-components";

const Button = ({ imgUrl, on, font, outline, border, margin, height, width, btntype, type, onClick, children, disabled }) => {
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
      btntype={btntype}
      disabled={disabled}
      on={on}
      imgUrl={imgUrl}
    >
      {children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  cursor: pointer;
  ${(props) => {
    return (
      props.btntype === "onOff" &&
      css`
        background-color: transparent;
        border: transparent;
        color:${(props) => (props.on === "on" ? "6px solid #222222" : " #CBCBCB")}; ;
        padding: 25px 0;
        width: 100%;
        border-bottom: ${(props) => (props.on === "on" ? "6px solid #8ecf70" : "6px solid #F5F5F5")};
        font-size: 20px;
        font-weight: 600;
        :hover {
          border: ${({ border }) => `${border}`};
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "submit" &&
      css`
        background-color:  #525252;
        border: none;
        border-radius: 6px;
        color: #ffffff;
        /* padding: 25px 0; */
        width: 60px;
        height: 40px;
        font-weight: 500;
        font-size: 18px;
        text-align: center;
        letter-spacing: -0.03em;
      `
    );
  }}
`;
