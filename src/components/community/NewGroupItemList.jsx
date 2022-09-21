import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { __getNewGroupItemList } from "../../redux/modules/communitySlice";

const NewGroupItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newGroupList } = useSelector((state) => state.community);
  React.useEffect(() => {
    dispatch(__getNewGroupItemList());
  }, [])
  return (
    <>
      {newGroupList.map((v) => (
        <NewGroupItem onClick={() => { navigate(`/community/detail/${v.communityId}`) }} key={v.communityId}>
          <NewGroupItemImg bgImg={v.img === null ? 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg' : v.img} >
            <ItemFlag>
              <span>모집중</span>
            </ItemFlag>
          </NewGroupItemImg>
          <NewGroupItemTitle>{v.title}</NewGroupItemTitle>
        </NewGroupItem>
      ))}
    </>
  )
}
export default NewGroupItemList;

const NewGroupItem = styled.div`
  margin: 0 4.5px;
`;
const NewGroupItemImg = styled.div`
  width: 143px;
  height: 175px;
  border-radius: 6px;
  position:relative;

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
const NewGroupItemTitle = styled.div`
  padding:5px 0;
  font-weight:bold;
  font-size:20px;
  line-height:25px;
  letter-spacing:-0.1em;
  text-align:center;
`;