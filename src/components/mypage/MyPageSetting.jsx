import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { __postNickNameOverlap, __updateMyInfoStatus } from '../../redux/modules/mypageSlice';
import { removeCookie } from '../../shared/cookie';
import { ReactComponent as Pen } from "../../assets/Pen.svg";
import Input from '../elements/Input';


const MyPage = () => {
  const { userInfo } = useSelector((state) => state.mypage);
  console.log(userInfo);

  const dispatch = useDispatch();

  const onSecretHandler = (flag) => {
    dispatch(__updateMyInfoStatus(flag));
  }
  const [nickFlag, setNickFlag] = React.useState(false);

  const onNickChangeHandler = (e) => {
    console.log(e.target.value);
    let timer = null;
    if (timer) //이전에 이벤트가 발생했다면
      clearTimeout(timer); //이전 이벤트를 지운다.
    if (e.target.value) {
      timer = setTimeout(() => {
        dispatch(__postNickNameOverlap(e.target.value));
      }, 200);
    }
  }
  return (
    <>
      <MyPageWrap>
        <Container>
          <LoginInfo>
            <LoginInfoTitle>로그인 정보</LoginInfoTitle>
            <LoginInfoContent>{userInfo.username}</LoginInfoContent>
          </LoginInfo>
          <NickInfo>
            {!nickFlag ?
              (<>
                <NickInfoTitle><span>닉네임 변경</span> <span onClick={() => { setNickFlag(!nickFlag) }}><Pen /></span></NickInfoTitle>
                <NickInfoContent>{userInfo.nickname}</NickInfoContent>
              </>) :
              (<>
                <NickInfoTitle><span>닉네임 변경</span> <span onClick={() => { setNickFlag(!nickFlag) }}><Pen /></span></NickInfoTitle>
                <Input type="text" placeholder={userInfo.nickname} onChange={onNickChangeHandler} />
              </>)}
          </NickInfo>
          <MyPageFlag>
            <MyPageFlagTitle>마이페이지 비공개</MyPageFlagTitle>
            <CheckBoxWrapper>
              <CheckBox secret={userInfo.secret} onClick={() => onSecretHandler(!userInfo.secret)} id="checkbox" type="checkbox" />
              <CheckBoxLabel secret={userInfo.secret} htmlFor="checkbox" />
            </CheckBoxWrapper>
          </MyPageFlag>
          <div>
            <LogoutBtn onClick={() => removeCookie('mycookie')}>로그아웃</LogoutBtn>
          </div>
        </Container>
      </MyPageWrap>
    </>
  )
}
export default MyPage;

const MyPageWrap = styled.div`
  width:100%;
  height:100%;
`;
const Container = styled.div`
  width:100%;
  background: #fff;
  padding:50px 26px 0;
  box-sizing:border-box;
`;

const LoginInfo = styled.div`
  width:100%;
  border-bottom:1px solid rgba(0,0,0,0.14);
  margin-bottom:32px;
  `;
const LoginInfoTitle = styled.h2`
  font:500 18px/1 'Noto sans','Arial','sans-serif';
  `;
const LoginInfoContent = styled.p`
  font:16px/1 'Noto sans','Arial','sans-serif';
  color:#7b7b7b;
  padding:20px 0 28px;
  box-sizing:border-box;
`;





const NickInfo = styled.div`
  width:100%;
  border-bottom:1px solid rgba(0,0,0,0.14);
  margin-bottom:32px;
`;
const NickInfoTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  font:500 18px/1 'Noto sans','Arial','sans-serif';
`;
const NickInfoContent = styled.p`
  font:700 22px/1 'Noto sans','Arial','sans-serif';
  padding:20px 0 28px;
  box-sizing:border-box;
`;





const MyPageFlag = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:60px;
`;
const MyPageFlagTitle = styled.h2`
  font:500 18px/24px 'Noto Sans','Arial','sans-serif';
`;
const LogoutBtn = styled.button`
  width:100%;
  font:500 18px/60px 'Noto Sans','Arial','sans-serif';
  background:transparent;
  border:1px solid #b5b5b5;
  color:#424242;
`;





/* ------------------------------ switch button ----------------------------- */
const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 43px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  ${(props) =>
    !props.secret &&
    css`
      background: #bebebe;
    `}

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    margin: 1px;
    background: #ffffff;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
    ${(props) =>
    !props.secret
      ? css`
            margin: 1px;
            box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
            transition: 0.2s;
          `
      : css`
            margin: 1px 0 0 20px;
          `}
  }
  background: ${(props) => (props.secret ? `#35bd47` : null)};
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked {
    ${(props) =>
    props.secret &&
    css`
        background: #35bd47;
        &::after {
          content: "";
          background-color: white;
          display: block;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          margin: 1px 0 0 20px;
          transition: 0.2s;
        }
      `}
  }
`;