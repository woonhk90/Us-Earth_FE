import React from "react";
import styled, { keyframes } from "styled-components";

const Sceleton = ({ width, height, margin }) => {
  return (
    <>
      <Box width={width}>
        <PlaceHolder height={height} margin={margin} />
      </Box>
    </>
  );
};

export default Sceleton;

const Box = styled.section`
  box-sizing: border-box;
  width: ${({ width }) => `${width}`};
`;

const animation = keyframes`
    0% {
      background-position: -50px;
    }
    40%,
    100% {
      background-position: 300px;
    }
`;

const PlaceHolder = styled.div`
  box-sizing: border-box;
  background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
  background-size: 350px;
  width: 100%;
  height: ${({ height }) => `${height}`};
  border-radius: 8px;
  margin: ${({ margin }) => `${margin}`};
  animation: ${animation} 3.5s infinite;
`;
