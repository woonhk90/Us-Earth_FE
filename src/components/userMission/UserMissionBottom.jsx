import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";
import { flexBetween, flexRow } from "../../styles/Flex";
import { getDailyMissionStats } from "../../redux/modules/userMissionSlice";
import { useEffect } from "react";
import { colors } from "../../styles/color";

const UserMissionBottom = () => {
  const dispatch = useDispatch();

  //클릭한 날짜 조회
  const { dailyMissionData } = useSelector((state) => state.userMission);

  useEffect(() => {
    dispatch(getDailyMissionStats(dayjs().format("YYYY-MM-DD")));
  }, []);

  return (
    <>
      <SelectDateWrap>
        <SelectDate>{dayjs(dailyMissionData.clearTime).format("YYYY년 MM월 DD일")}</SelectDate>
        <SuccessMission>{dailyMissionData.count}개 완료</SuccessMission>
      </SelectDateWrap>
      <SelectDateMissionListWrap>
        <div>
          {dailyMissionData.clearMissionList?.map((data, index) => {
            return (
              <SelectMissionSingleWrap key={data.id}>
                <SelectDateMissionDot className={`dot${index}`} />
                <SelectDateSingle>{data.content}</SelectDateSingle>
              </SelectMissionSingleWrap>
            );
          })}
        </div>
      </SelectDateMissionListWrap>
    </>
  );
};

export default UserMissionBottom;

const SelectDate = styled.span`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
`;

const SuccessMission = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #898989;
  letter-spacing: -0.02em;
`;

const SelectDateSingle = styled.span`
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
`;

const SelectDateWrap = styled.div`
  ${flexBetween}
  padding: 21px 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const SelectDateMissionListWrap = styled.div`
  padding: 12px 33px;
  .dot0 {
    background-color: ${colors.dot1};
  }
  .dot1 {
    background-color: ${colors.dot2};
  }
  .dot2 {
    background-color: ${colors.dot3};
  }
  .dot3 {
    background-color: ${colors.dot4};
  }
  .dot4 {
    background-color: ${colors.dot5};
  }
  @media (max-width: 389px) {
    padding: 12px;
  }
`;

const SelectMissionSingleWrap = styled.div`
  ${flexRow}
  padding:14px 0;
  box-sizing: border-box;
`;

const SelectDateMissionDot = styled.div`
  width: 22px;
  height: 22px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 17px;
  @media (max-width: 389px) {
    width: 18px;
    height: 18px;
  }
`;
