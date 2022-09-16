import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Lock } from "../assets/Lock.svg";
import SampleImg01 from "../assets/poster01.jpg";
import SampleImg02 from "../assets/poster02.jpg";
import { useDispatch, useSelector } from "react-redux";
import { __getCommunity, certifyReset } from "../redux/modules/communitySlice";
import { useInView } from "react-intersection-observer";
import SampleImg03 from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";
import banner01 from '../assets/banner.png';
import PopularGroupItemList from './community/PopularGroupItemList';
import NewGroupItemList from './community/NewGroupItemList';

const Community = () => {
  const dispatch = useDispatch();
  const { community } = useSelector((state) => state.community);
  const searchVal = useSelector((state) => state);
  console.log("community=>", community);
  console.log("검색단어=>", searchVal.community.search);

  /* ------------------------------- 무한스크롤 기본셋팅 ------------------------------- */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  /* ----------------------------- 커뮤니티 전체목록 가져오기 ----------------------------- */
  useEffect(() => {
    console.log("커뮤니티 호출");
    dispatch(__getCommunity({ page, search }));
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
      // setSearch(searchVal.community.search);
    }
  }, [inView]);

  console.log("inView=>", inView);

  /* -------------------------------- 상세페이지로 이동 ------------------------------- */
  const navigate = useNavigate();
  const onDetailHandler = (id) => {
    dispatch(certifyReset());
    navigate(`/community/detail/${id}`);
  };

  return (
    <>
      <CommunityWrap>
        <Container>
          <Banner><img src={banner01} alt='bannerImg' /></Banner>

          <PopularGroup>
            <PopularGroupTop>
              <PopularGroupTitle>인기 그룹</PopularGroupTitle>
            </PopularGroupTop>
            <PopularGroupBox>
              <PopularGroupItemList />
            </PopularGroupBox>
          </PopularGroup>

          <NewGroup>
            <NewGroupTop>
              <NewGroupTitle>마감임박 그룹</NewGroupTitle>
            </NewGroupTop>
            <NewGroupBox>
              <NewGroupItemList />
            </NewGroupBox>
          </NewGroup>

          <CommunityGroup>
            <CommunityGroupTop>
              <CommunityGroupTitle>전체 그룹</CommunityGroupTitle>
            </CommunityGroupTop>
            <CommunityBox>

              {community?.map((v) => (
                <CommunityItem
                  key={v.communityId}
                  onClick={() => {
                    onDetailHandler(v.communityId);
                  }}
                >
                  <ItemImg
                    bgImg={
                      v.img !== null
                        ? v.img
                        : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"
                    }
                  >
                    <ItemCount>{v.communityId}%</ItemCount>
                    <ItemProgress>
                      <IP value={v.communityId} max="100"></IP>
                    </ItemProgress>
                  </ItemImg>
                  <ItemTitle>{v.title}</ItemTitle>
                </CommunityItem>
              ))}
              <div ref={ref}></div>
            </CommunityBox>
          </CommunityGroup>
        </Container>
      </CommunityWrap>
    </>
  );
};
export default Community;

const CommunityWrap = styled.div``;
const Container = styled.div``;

const Banner = styled.div`
  width: 100%;
  height: 100%;
`;

const PopularGroup = styled.div`
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
`;
const PopularGroupTop = styled.div`
  padding: 0 15px;
`;
const PopularGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const PopularGroupBox = styled.div`
  padding: 0 4.5px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;





const NewGroup = styled.div`
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
`;
const NewGroupTop = styled.div`
  padding: 0 15px;
`;
const NewGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const NewGroupBox = styled.div`
  padding: 0 4.5px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;




const CommunityGroup = styled.div`
  box-sizing: border-box;
`;
const CommunityGroupTop = styled.div`
  padding: 0 15px;
`;
const CommunityGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const CommunityBox = styled.div`
  /* display:flex;
  justify-content:center;
  flex-wrap: wrap; */

  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
`;
const CommunityItem = styled.div``;
const ItemImg = styled.div`
  width: 176px;
  height: 215px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 6px;

  position: relative;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg}) no-repeat center center;
  background-size: cover;
  color: #fff;
`;
const ItemCount = styled.div`
  position: absolute;
  bottom: 35px;
  right: 10px;
`;
const ItemProgress = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  margin-left: -80px;
`;
const IP = styled.progress``;
const ItemTitle = styled.div`
  font: bold 20px/40px "Arial", "sans-serif";
  /* color:black; */
`;
