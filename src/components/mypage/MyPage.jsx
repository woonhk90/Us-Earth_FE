import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from '../../redux/modules/mypageSlice';
import MyPageTodayMission from './MyPageTodayMission';
import { useNavigate } from "react-router-dom";
import icons from '../../assets';
import { colors } from '../../styles/color';

import { __postNickNameOverlap, __postNickNameSubmit, resetOverlap } from '../../redux/modules/mypageSlice';
import Input from '../elements/Input';
import { debounce } from "lodash";
import MyPageProfileModal from '../Modals/MyPageProfileModal';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(__getMyInfo());
  }, [dispatch])
  const { Chart, Group, RightThinArrow, MoveNext, Check, CheckCancel, NickNameArrow, Camera, IconSearch } = icons;
  const { userInfo } = useSelector((state) => state.mypage);




  const { overlap } = useSelector((state) => state.mypage);//닉네임 입력하면 중복인지 여부 알려줌(응답값)
  const [overlapFlag, setOverlapFlag] = React.useState(false);// 중복여부 상태값(true/false)
  const [userNick, setUserNick] = React.useState(false);  //true: 닉네임 input, false: 닉네임
  const onChangeNick = () => {
    setNewNick('');//닉네임 초기화
    dispatch(resetOverlap());//닉네임 입력하면 중복인지 여부 알려줌(응답값) => 초기화
    setUserNick(!userNick);
  }
  const [newNick, setNewNick] = React.useState('');//새로 입력하는 닉네임
  const [profileModalFlag, setProfileModalFile] = React.useState(false);//프로필 모달 flag

  /* --------------------------------- 닉네임 변경 --------------------------------- */
  const debounceSomethingFunc = debounce((val) => {
    dispatch(__postNickNameOverlap({ nickname: val }));
  }, 200);

  const onDebounceChange = event => {
    const { value } = event.target;
    if (value.trim().length > 7) return;
    setNewNick(value);
    debounceSomethingFunc(value);
  };

  const onNickNameSubmit = async () => {
    if (newNick.length > 0) {
      await dispatch(__postNickNameSubmit({ nickname: newNick }));
      setUserNick(!userNick);
    } else {
      window.alert("변경할 닉네임을 입력해주세요.");
      return false;
    }
  }

  React.useEffect(() => {
    setOverlapFlag(overlap);
  }, [overlap, dispatch])

  /* --------------------------------- 프로필 변경 --------------------------------- */
  const onChangeProfile = () => {
    setProfileModalFile(!profileModalFlag);
  }

  const closeModal = () => {
    setProfileModalFile(!profileModalFlag);
  };

  /* ---------------------------------- 등급 명칭 --------------------------------- */
  let levelName = '';
    if (userInfo.level >= 1 && userInfo.level <= 2) {
      levelName='씨앗';
    } else if (userInfo.level >= 3 && userInfo.level <= 4) {
      levelName='새싹';
    } else if (userInfo.level >= 5 && userInfo.level <= 7) {
      levelName='잎새';
    } else if (userInfo.level >= 8 && userInfo.level <= 10) {
      levelName='애기나무';
    } else if (userInfo.level >= 11) {
      levelName='어른나무';
    }


  return (
    <>
      {profileModalFlag && <MyPageProfileModal closeModal={closeModal} imgSrc={userInfo?.profileImage}></MyPageProfileModal>}
      <MyPageWrap>
        <Container>
          <MyPageInfo>
            <MyPageInfoBox>

              {userNick ?
                <NickChangeTrue>
                  <Input inputype="nick" placeholder={userInfo.nickname} onChange={onDebounceChange} maxLength='7' value={newNick} />
                  <span><Check onClick={onNickNameSubmit} /> <CheckCancel onClick={onChangeNick} /></span>
                  {overlapFlag ? <P>가능한 닉네임입니다.</P> : <P color={'red'}>불가능한 닉네임입니다.</P>}
                </NickChangeTrue>
                :
                <NickChangeFalse>{userInfo?.nickname} <span onClick={onChangeNick}>수정 <NickNameArrow /></span></NickChangeFalse>
              }

              {/* <div>{userInfo?.nickname}</div> */}
              <div>LV.{userInfo?.level} {levelName}</div>
            </MyPageInfoBox>
            <MyPageProFile>
              <img src={userInfo?.profileImage} alt='profileImage' referrerPolicy="no-referrer" />
              <ProfileSearch onClick={onChangeProfile}><IconSearch /></ProfileSearch>
            </MyPageProFile>
          </MyPageInfo>


          <MyPageTodayMission userInfo={userInfo} />


          <MyPageMissionList>
            <MyPageMissionListBox>
              <div>나의 미션 목록</div>
              <div onClick={() => navigate('/mypage/mission/week')}><span><Chart /><span>개인 미션 통계</span></span><span><MoveNext /></span></div>
              <div onClick={() => navigate('/mypage/mission/group')}><span><Group /><span>그룹 미션</span></span><span><MoveNext /></span></div>
            </MyPageMissionListBox>
          </MyPageMissionList>
        </Container>
      </MyPageWrap>
    </>
  );
};
export default MyPage;

const MyPageWrap = styled.div`
  width: 100%;
  height: 100%;
  letter-spacing: -0.1em;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: rgb(245, 245, 245);
`;
const MyPageInfo = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 25px 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MyPageInfoBox = styled.div`
  max-width:75%;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR','sans-serif';
  div:nth-child(1) {
    font-weight: 600;
    font-size:24px;
    height:45px;
  }
  div:nth-child(2) {
    font-weight: 500;
    font-size:20px;
    line-height:28px;
    color: #9b9b9b;
    letter-spacing:0.05em;
  }
  @media (max-width: 350px) {
    max-width:72%;
  }
  @media (max-width: 320px) {
    max-width:68%;
    div:nth-child(1){font-size:19px;}
    div:nth-child(2){font-size:15px;}
  }
`;
const NickChangeTrue = styled.div`
  display:flex;
  justify-content:start;
  align-items:center;
  
  position:relative;
  top:0;left:0;
  input{
    border-bottom:1px solid #000;
  }
  span{cursor:pointer;display:inline-block;display:flex;}
  
`;
const P = styled.p`
  position:absolute;
  bottom:0; right:75px;
  font-size:10px;
  line-height:2;
  color:${(props) => props.color};
`;
const NickChangeFalse = styled.div`
  span{
    cursor:pointer;
    color:${colors.gray9B};
    font-weight: 500;
    display:inline-block;
    margin-left:10px;
    @media (max-width: 320px) {
      margin-left:2px;
    }
  }
`;





const MyPageProFile = styled.div`
  position:relative;
  width: 74px;
  height: 74px;
  @media (max-width: 320px) {
    width:65px;
    height: 65px;
  }
  border-radius:50%;
  top:0;
  left:0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const ProfileSearch = styled.form`
  width:25px;
  height:25px;
  border-radius: 50%;
  padding:5px;
  box-sizing:border-box;
  background-color:${colors.grayF5};
  cursor: pointer;
  display:flex;
  align-items:center;

  position:absolute;
  bottom:0;
  right:0;
`;











const MyPageMissionList = styled.div`
  background-color: #fff;
  padding: 25px 26px;
`;
const MyPageMissionListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  div:nth-child(1) {
    font: 600 24px/35px "Noto sans KR", "sans-serif";
  }
  div:nth-child(2),
  div:nth-child(3) {
    cursor:pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 18px/25px "Noto sans KR", "sans-serif";
    span > span {
      display: inline-block;
      padding: 0 15px;
    }
  }
`;
