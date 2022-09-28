import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { colors } from '../../styles/color';
import icons from '../../assets';

const GuideTop = () => {
	const { Back } = icons;
	const navigate = useNavigate();

	const onClickHandler = () => {
		navigate(-1);
	}
	return (
		<>
			<HeaderWrap>
				<IconDiv onClick={onClickHandler}>
					<Back />
				</IconDiv>
			</HeaderWrap>
		</>
	)
}
export default GuideTop;

const HeaderWrap = styled.div`
  width:100%;
  height:48px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 10px 16px;
  box-sizing:border-box;
  z-index:1;
  color:${colors.black22};
  border-bottom:1px solid ${colors.grayF5};
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;