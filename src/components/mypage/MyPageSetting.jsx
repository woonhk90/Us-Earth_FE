import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { __postNickNameOverlap, __updateMyInfoStatus, __postNickNameSubmit } from '../../redux/modules/mypageSlice';
import { returnRemoveCookie, removeCookie, getCookie } from '../../shared/cookie';
import { ReactComponent as Pen } from "../../assets/Pen.svg";
import Input from '../elements/Input';
import { __getMyInfo } from '../../redux/modules/mypageSlice';
import { debounce } from "lodash";
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axios';
import axios from 'axios';



const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.mypage);//유저정보가져옴
  const { overlap } = useSelector((state) => state.mypage);//닉네임 입력하면 중복인지 여부 알려줌
  const [nickFlag, setNickFlag] = useState(false);//닉네임 변경 하겠냐(true/false)
  const [overlapFlag, setOverlapFlag] = useState(false);// 중복여부 상태값(true/false)
  const [changeNicName, setChangeNickName] = useState('');


  /* -------------------------- 내정보 페이지 공개 비공개 선택 가능 -------------------------- */
  const onSecretHandler = (flag) => {
    dispatch(__updateMyInfoStatus(flag));
  }

  /* -------------------------- 닉네임 실시간으로 상태값 받을 수 있음 ------------------------- */
  const debounceSomethingFunc = debounce((val) => {
    if (val.length > 0) {
      setOverlapFlag(val);
    } else {
      setOverlapFlag(val);
    }
    setChangeNickName(val);
    dispatch(__postNickNameOverlap({ nickname: val }));
  }, 200);


  const onDebounceChange = event => {
    debounceSomethingFunc(event.target.value);
  };


  useEffect(() => {
    dispatch(__getMyInfo());
    setOverlapFlag(overlap);
  }, [overlap, dispatch])

  const onNickNameSubmit = async () => {
    if (changeNicName.length > 0) {
      await dispatch(__postNickNameSubmit({ nickname: changeNicName }));
      setNickFlag(!nickFlag);
    } else {
      window.alert("변경할 닉네임을 입력해주세요.");
      return false;
    }
  }







  // const [list, setList] = React.useState([]);
  // const getPopularGroupItemList = async () => {
  //   const response = await instance.get("/community/active");
  //   setList(response.data);
  // }
  // React.useEffect(() => {
  //   const response = getPopularGroupItemList();
  //   setList(response);
  // }, [])
  // list.then((value) => {
  //   });



  const onLogoutHandler = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL_NOT_AIP}/user/logout`, {
      headers: {
        Authorization: getCookie('mycookie'),
      },
    });
    if(response.status===200){
      await removeCookie('mycookie');
      await removeCookie('refreshToken');
      await removeCookie('memberId');
      navigate('/');
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
                <NickInfoTitle><span>닉네임 변경</span> <span onClick={() => { onNickNameSubmit() }}><Pen /></span></NickInfoTitle>
                <Input type="text" placeholder={userInfo.nickname} onChange={onDebounceChange} maxLength='7' />
                <OverlapFlagBox><OverlapFlagContent color={overlapFlag ? 'black' : 'red'}>사용{overlapFlag ? '가능한' : '불가능한'} 닉네임 입니다.</OverlapFlagContent></OverlapFlagBox>
              </>)}
          </NickInfo>
          <MyPageFlag>
            <MyPageFlagTitle>내정보 페이지 비공개</MyPageFlagTitle>
            <CheckBoxWrapper>
              <CheckBox secret={userInfo.secret} onClick={() => onSecretHandler(!userInfo.secret)} id="checkbox" type="checkbox" />
              <CheckBoxLabel secret={userInfo.secret} htmlFor="checkbox" />
            </CheckBoxWrapper>
          </MyPageFlag>
          <div>
            <LogoutBtn onClick={onLogoutHandler}>로그아웃</LogoutBtn>
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
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
`;
const LoginInfoTitle = styled.h2`
  font: 500 18px/1 "Noto sans", "sans-serif";
`;
const LoginInfoContent = styled.p`
  font: 16px/1 "Noto sans", "sans-serif";
  color: #7b7b7b;
  padding: 20px 0 28px;
  box-sizing: border-box;
`;

const NickInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
`;
const NickInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: 500 18px/1 "Noto sans", "sans-serif";
`;
const NickInfoContent = styled.p`
  font: 700 22px/1 "Noto sans", "sans-serif";
  padding: 20px 0 28px;
  box-sizing: border-box;
`;
const OverlapFlagBox = styled.div`
  text-align: right;
`;
const OverlapFlagContent = styled.span`
  font-size: 10px;
  color: ${(props) => props.color};
`;

const MyPageFlag = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
`;
const MyPageFlagTitle = styled.h2`
  font: 500 18px/24px "Noto Sans","sans-serif";
`;
const LogoutBtn = styled.button`
  width: 100%;
  font: 500 18px/60px "Noto Sans","sans-serif";
  background: transparent;
  border: 1px solid #b5b5b5;
  color: #424242;
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
