import React from "react";
import styled from "styled-components";
import icons from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { __getTodayMission, __updateMissionFlag } from "../../redux/modules/mypageSlice";
import { colors } from "../../styles/color";
import ConfirmTodayMissionModal from '../Modals/ConfirmTodayMissionModal';

const MyPageTodayMission = ({ userInfo }) => {
  const { level_01, level_02, level_03, level_04, level_05 } = icons;
  let imgUrl = null;
  if (userInfo.level >= 1 && userInfo.level <= 2) {
    imgUrl = level_01;
  } else if (userInfo.level >= 3 && userInfo.level <= 4) {
    imgUrl = level_02;
  } else if (userInfo.level >= 5 && userInfo.level <= 7) {
    imgUrl = level_03;
  } else if (userInfo.level >= 8 && userInfo.level <= 10) {
    imgUrl = level_04;
  } else if (userInfo.level >= 11) {
    imgUrl = level_05;
  }

  /* --------------------------- 나무 성장모습 & 미션 리스트 토글 -------------------------- */
  const [missionFlag, setMissionFlag] = React.useState(false);
  const dispatch = useDispatch();

  const { todayMission } = useSelector((state) => state.mypage);

  /* ------------------------------- 오늘의 미션 가져오기 ------------------------------ */
  const onClickTodayMission = () => {
    dispatch(__getTodayMission());
    setMissionFlag(!missionFlag);
  };
  React.useEffect(() => {
    dispatch(__getTodayMission());
  }, []);

  /* -------------------------------- 일일 미션 누르면 ------------------------------- */
  // const missionFlagChange = (key) => {
  //   dispatch(__updateMissionFlag({ missionName: key }));
  // };

  /* -------------------------------- edit modal ------------------------------- */
  const [modal, setModal] = React.useState(false);
  const [missionId, setMissionId] = React.useState('');
  const [missionDiff, setMissionDiff] = React.useState('');

  const onMissionClick = (id, flag, diff) => {
    if (!flag) {
      setMissionId(id);
      setMissionDiff(diff);
      setModal(!modal);
    }
  }

  // modal text data
  const confirmModalData = {
    title: "미션을 완료 하겠습니까??",
    cancel: "아니오",
    submit: "예",
  };

  const modalOnOff = () => {
    setModal(!modal);
  };

  const clickSubmit = () => {
    dispatch(__updateMissionFlag({ missionName: missionId, difficulty: missionDiff }));
  };

  return (
    <>
      {modal && <ConfirmTodayMissionModal confirmModalData={confirmModalData} clickSubmit={clickSubmit} closeModal={modalOnOff} />}
      <MyPageMission imgUrl={imgUrl}>
        {
          missionFlag ?
            (<TodayMission>
              <TodayMissionBox>
                <p>오늘의 미션</p>
                <p onClick={() => setMissionFlag(!missionFlag)}>미션 닫기({todayMission.filter((v) => v.complete === true).length}/5)</p>
              </TodayMissionBox>
              <MissionBox>
                {
                  todayMission.map(
                    (v) =>
                      <MissionItem key={v.missionName} onClick={() => { onMissionClick(v.missionName, v.complete, v.difficulty) }} background={v.complete}>
                        <ItemTitle background={v.complete}>{v.missionName}</ItemTitle>
                      </MissionItem>
                  )
                }
              </MissionBox>
            </TodayMission>)
            : (<>
              <MissionTop>
                <p>오늘의 미션</p>
                <p onClick={() => onClickTodayMission()}>미션 보기({todayMission.filter((v) => v.complete === true).length}/5)</p>
              </MissionTop>
              <MissionBottom>
                <p>{userInfo.nextLevelExp} / {userInfo.needNextLevelExp}</p>
                <progress value={userInfo.nextLevelExp} max={userInfo.needNextLevelExp} />
              </MissionBottom></>)
        }
      </MyPageMission>
    </>
  )
}
export default MyPageTodayMission;

const MyPageMission = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px 0;
  box-sizing: border-box;

  background: url(${(props) => props.imgUrl}) no-repeat 50% 80%;
  background-size: cover;
`;
const MissionTop = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 15px;
  box-sizing: border-box;
  p:nth-child(1) {
    font: 600 24px/1 "Noto Sans KR","sans-serif";
  }
  p:nth-child(2) {
    font: 500 20px/1 "Noto Sans KR", "sans-serif";
    color: #9b9b9b;
  }
  @media (max-width: 374px) {
    p:nth-child(1) {
      font-size:22px;
    }
    p:nth-child(2) {
      font-size:18px;
    }
  }
`;
const MissionBottom = styled.div`
  width: 100%;
  padding: 0 35px 8px;
  box-sizing: border-box;
  position: relative;
  p {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    letter-spacing: 5px;
    color: ${colors.white};
  }
  progress {
    appearance: none;
    width: 100%;
    height: 18px;
  }
  progress::-webkit-progress-bar {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
  }
  progress::-webkit-progress-value {
    border-radius: 10px;
    background: linear-gradient(to right, ${colors.green89}, ${colors.green28});
  }
`;

const TodayMission = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  padding: 25px 15px 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;
const TodayMissionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  p:nth-child(1) {
    font: 600 24px/1 "Noto Sans KR", "sans-serif";
  }
  p:nth-child(2) {
    font: 500 20px/1 "Noto Sans KR","sans-serif";
    color: #9b9b9b;
  }
  @media (max-width: 374px) {
    p:nth-child(1) {
      font-size:22px;
    }
    p:nth-child(2) {
      font-size:18px;
    }
  }
`;
const MissionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  text-align: center;
`;

const MissionItem = styled.span`
  border-radius: 50px;
  display: inline-block;
  width: 100%;
  color: #2c2c2c;
  padding: 18px 0;
  box-sizing: border-box;
  color: ${(props) => (props.background ? `${colors.grayCF}` : `${colors.white}`)};
  background-color: ${(props) => (props.background ? `${colors.grayF9}` : `${colors.green77}`)};
`;
const ItemTitle = styled.span`
  display: block;
  text-decoration: ${(props) => (props.background ? "line-through" : "blue")};
  font-weight: 500;
  font-size:18px;
  line-height:1;
  font-family:'Noto sans KR','sans-serif';
  @media (max-width: 374px) {
    font-size:16px;
  }
`;
