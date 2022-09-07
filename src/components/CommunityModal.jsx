import React from "react";
import styled from "styled-components";
import { ReactComponent as Cancel } from "../assets/Cancel.svg";
import { __getCommunity } from "../redux/modules/communitySlice";
import { useDispatch } from "react-redux";
import { ingVal } from "../redux/modules/communitySlice";

const CommunityModal = (props) => {
  /* ---------------------------------- 모달 닫기 --------------------------------- */
  const closeModal = () => {
    props.closeModal();
  };

  /* -------------------------------- input 검색 -------------------------------- */
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const dispatch = useDispatch();
  const onSearchHandler = async () => {
    dispatch(__getCommunity({ page, search }));
    dispatch(ingVal());
    closeModal();
  };
  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SearchBox>
            <SearchIcon onClick={closeModal}>
              <Cancel />
            </SearchIcon>
            <SearchInput type="text" onChange={onChangeHandler} placeholder="검색어를 입력해주세요." />
            <SearchBtn onClick={onSearchHandler}>검색</SearchBtn>
          </SearchBox>
          <SuggestWrap>
            <SuggestTitle>추천검색어</SuggestTitle>
            <SuggestBox>
              <SuggestItem>분리수거</SuggestItem>
              <SuggestItem>재활용</SuggestItem>
              <SuggestItem>세글자</SuggestItem>
              <SuggestItem>재활용</SuggestItem>
              <SuggestItem>두자</SuggestItem>
              <SuggestItem>분리수러</SuggestItem>
            </SuggestBox>
          </SuggestWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default CommunityModal;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const ModalBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;

  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 37px;
`;
const SearchIcon = styled.span`
  display: inline-block;
  margin-left: 18px;
  font-size: 16px;
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 50%;
`;
const SearchBtn = styled.button`
  background-color: #424242;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 8px 13px;
  box-sizing: border-box;
`;

const SuggestWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: content;
  padding: 0 27px;
  box-sizing: border-box;
`;
const SuggestTitle = styled.div`
  font: bold 22px/1 "Arial", "sans-serif";
  margin-bottom: 13px;
`;
const SuggestBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: content;
`;
const SuggestItem = styled.span`
  display: inline-block;
  font: 18px/1 "Arial", "sans-serif";
  border: 1px solid #000;
  padding: 10px 20px;
  margin: 6px 4px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
`;
