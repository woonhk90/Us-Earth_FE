import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { __getInfo } from "../../redux/modules/infoSlice";
import Loading from '../etc/Loading';

const Info = () => {
  const { infoList, isLoading } = useSelector((state) => state.info);
  console.log(infoList);

  /* ------------------------------- 무한스크롤 기본셋팅 ------------------------------- */
  const [page, setPage] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);
  console.log(inView);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getInfo({ page }));
  }, [page]);

  return (
    <>
      <CampaignBox>
        {infoList.map((v) => {
          console.log(v)
          return (
            <CampaignItem key={v.campaignId} onClick={() => window.open(`${v.thumbnailUrl}`, "_blank")}>
              <CampaignItemPoster>
                <img src={v.thumbnail} alt="thumbnailImg" />
              </CampaignItemPoster>
              <CampaignItemTitle>{v.title}</CampaignItemTitle>
            </CampaignItem>
          );
        })}
      </CampaignBox>
      {/* <Loading /> */}
      {isLoading ? <Loading /> : <div ref={ref}></div>}
    </>
  );
};
export default Info;

const CampaignBox = styled.div``;
const CampaignItem = styled.div``;
const CampaignItemPoster = styled.div`
  width: 100%;
  height: 150px;
  background: gray;
  border-radius: 6px;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const CampaignItemTitle = styled.div`
  font: 600 20px/28px "Noto Sans", "Arial", "sans-serif";
  margin-bottom: 15px;

  /* 말줄임 */
  /* white-space:nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;

  /* 두줄 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
