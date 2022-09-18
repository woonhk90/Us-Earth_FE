import React from 'react';
import styled from 'styled-components';
import Seed from "../../assets/Seed.svg";
import MypageBG from "../../assets/mypage-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { __getTodayMission, __updateMissionFlag } from '../../redux/modules/mypageSlice';
import { colors } from '../../styles/color';


const MyPageTodayMission = () => {
  /* --------------------------- 나무 성장모습 & 미션 리스트 토글 -------------------------- */
  const [missionFlag, setMissionFlag] = React.useState(false);
  const dispatch = useDispatch();

  const { todayMission } = useSelector((state) => state.mypage);
  console.log(todayMission);

  const onClickTodayMission = () => {
    dispatch(__getTodayMission());
    setMissionFlag(!missionFlag);
  }
  React.useEffect(() => {
    dispatch(__getTodayMission());
  }, [])
  const missionFlagChange = (key) => {
    dispatch(__updateMissionFlag({ missionName: key }));
  }
  return (
    <>
      <MyPageMission imgUrl={MypageBG}>
        {
          missionFlag ?
            (<TodayMission>
              <TodayMissionBox>
                <p>오늘의 미션</p>
                <p onClick={() => setMissionFlag(!missionFlag)}>미션 닫기({todayMission.filter((v) => v.complete === true).length}/5)</p>
              </TodayMissionBox>
              <MissionBox>
                {
                  todayMission.map((v) => <MissionItem key={v.missionName} onClick={() => missionFlagChange(v.missionName)} background={v.complete}><ItemTitle background={v.complete}>{v.missionName}</ItemTitle></MissionItem>)
                }
              </MissionBox>
            </TodayMission>)
            : (<>
              <MissionTop>
                <p>오늘의 미션</p>
                <p onClick={() => onClickTodayMission()}>미션 보기({todayMission.filter((v) => v.complete === true).length}/5)</p>
              </MissionTop>
              <MissionBottom>
                <progress value='1' max="7" />
              </MissionBottom></>)
        }
      </MyPageMission>
    </>
  )
}
export default MyPageTodayMission;

const MyPageMission = styled.div`
  width:100%;
  min-height:50vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  padding:20px 15px 0;
  box-sizing:border-box;

  background: url(${(props) => props.imgUrl}) no-repeat 50% 80%;
  background-size:cover;
`;
const MissionTop = styled.div`
  width:100%;
  background-color:#fff;
  border-radius:12px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:25px 15px;
  box-sizing:border-box;
  p:nth-child(1){font:600 24px/1 'Noto Sans','Arial','sans-serif';}
  p:nth-child(2){font:500 20px/1 'Noto Sans','Arial','sans-serif';color: #9b9b9b;}
`;
const MissionBottom = styled.div`
  width:100%;
  padding:0 35px 8px;
  box-sizing:border-box;
  progress{
    appearance: none;
    width:100%;
    height:15px;
  }
  progress::-webkit-progress-bar {
    background:rgba(255,255,255,0.25);
    border-radius:10px;
  }
  progress::-webkit-progress-value {
    border-radius:10px;
    background:${colors.green89};
  }
`;

const TodayMission = styled.div`
  width:100%;
  background-color:#fff;
  border-radius:12px;
  padding:25px 15px 15px;
  box-sizing:border-box;
  margin-bottom:20px;
  `;
const TodayMissionBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 0 20px 0;
    box-sizing:border-box;
    p:nth-child(1){font:600 24px/1 'Noto Sans','Arial','sans-serif';}
    p:nth-child(2){font:500 20px/1 'Noto Sans','Arial','sans-serif';color: #9b9b9b;}
`;
const MissionBox = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:5px;
  text-align:center;
  `;

const MissionItem = styled.span`
  border-radius:50px;
  display:inline-block;
  width:100%;
  font:500 18px/1 'Noto Sans','Arial','sans-serif';
  color:#2c2c2c;
  padding:18px 0;
  box-sizing:border-box;
  color:${(props) => props.background ? `${colors.grayCF}` : `${colors.white}`};
  background-color:${(props) => props.background ? `${colors.grayF9}` : `${colors.green77}`};
  background-color:${(props) => props.background ? `${colors.grayF9}` : `${colors.green77}`};
`;
const ItemTitle = styled.span`
  display:block;
  text-decoration:${(props) => props.background ? 'line-through' : 'blue'};
`;