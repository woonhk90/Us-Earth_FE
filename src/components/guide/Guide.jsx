import React from 'react';
import styled from 'styled-components';
import GuideImg from '../../assets/banner_guide.jpg';
const Guide = () => {
  return (
    <>
      <GuideWrap>
        <img src={GuideImg} alt="GuideImg"/>
      </GuideWrap>
    </>
  )
}
export default Guide;
const GuideWrap = styled.div`
  width:100%;
  height:auto;
  img{
    width:100%;
  }
`;