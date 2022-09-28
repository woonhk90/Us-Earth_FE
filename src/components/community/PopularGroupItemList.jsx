import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { __getPopularGroupItemList } from "../../redux/modules/communitySlice";
import { getPopularGroupItemList } from "../../api/communityApi";
import { instance } from "../../api/axios";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";


const PopularGroupItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { popularGroupList } = useSelector((state) => state.community);
  React.useEffect(() => {
    dispatch(__getPopularGroupItemList());
  }, [])





  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1.8,
          },
          280: {
            slidesPerView: 2,
          },
          310: {
            slidesPerView: 2.2,
          },
          350: {
            slidesPerView: 2.4,
          },
          380: {
            slidesPerView: 2.6,
          },
          410: {
            slidesPerView: 2.8,
          },
          440: {
            slidesPerView: 3,
          },
          470: {
            slidesPerView: 3.2,
          },
          500: {
            slidesPerView: 3.4,
          },
          541: {
            slidesPerView: 2.8,
          },
        }}
      >
        {popularGroupList.map((v) => (
          <SwiperSlide key={v.communityId} style={{ padding: '0 5px', boxSizing:'border-box' }}>
            <PopularGroupItem onClick={() => { navigate(`/community/detail/${v.communityId}`) }}>
              <PopularGroupItemImg bgImg={v.img === null ? 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg' : v.img} >
                <ItemFlag>
                  <span>진행중</span>
                </ItemFlag>
              </PopularGroupItemImg>
              <PopularGroupItemTitle>{v.title}</PopularGroupItemTitle>
            </PopularGroupItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default PopularGroupItemList;

const PopularGroupItem = styled.div`
`;
const PopularGroupItemImg = styled.div`
  width:100%;
  max-width: 145px;
  height: 175px;
  border-radius: 6px;
  margin:0 auto;
  position: relative;

  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
const ItemFlag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  color: #fff;
`;
const PopularGroupItemTitle = styled.p`
  padding:5px 0;
  font-weight:bold;
  font-size:20px;
  line-height:25px;
  letter-spacing:-0.1em;

  /* 말줄임 */
  /* white-space:nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;

  /* 두줄 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* color:black; */
`;