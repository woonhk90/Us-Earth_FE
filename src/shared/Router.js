import { Routes, Route } from "react-router-dom";
import EarthLogin from "../pages/EarthLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import EarthCommunityForm from "../pages/EarthCommunityForm";
import EarthCommunityFormEdit from "../pages/EarthCommunityFormEdit";
import EarthCommunity from "../pages/EarthCommunity";
import EarthCommunityDetail from "../pages/EarthCommunityDetail";
import EarthCommunityProof from "../pages/EarthCommunityProof";
import EarthCommunityProofForm from "../pages/EarthCommunityProofForm";
import EarthMyPage from "../pages/EarthMyPage";
import EarthMyPageSetting from "../pages/EarthMyPageSetting";
import EarthCommunityProofEdit from "../pages/EarthCommunityProofEdit";
import EarthMyPageMissonMonth from "../pages/EarthMyPageMissonMonth";
import CommunityProofPost from "../components/proof/CommunityProofEdit";
import EarthInfo from "../pages/EarthInfo";
import EarthMyPageMissonWeek from "../pages/EarthMyPageMissonWeek";
import EarthMyPageMissionGroup from '../pages/EarthMyPageMissionGroup';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EarthCommunity />} />
      <Route path="/login" element={<EarthLogin />} />
      <Route path="/community" element={<EarthCommunity />} />
      <Route path="/community/form" element={<EarthCommunityForm />} />
      <Route path="/community/edit/:id" element={<EarthCommunityFormEdit />} />
      {/* <Route path="/community" element={<EarthCommunity />} /> */}
      <Route path="/community/detail/:id" element={<EarthCommunityDetail />} />
      <Route path="/community/:communityId/proof/:proofId" element={<EarthCommunityProof />} />
      <Route path="/community/:communityId/proof/form" element={<EarthCommunityProofForm />} />
      <Route path="/community/:communityId/proof/edit/:proofId" element={<EarthCommunityProofEdit />} />
      <Route path="/mypage" element={<EarthMyPage />} />
      <Route path="/mypage/setting" element={<EarthMyPageSetting />} />
      <Route path="/mypage/mission/month" element={<EarthMyPageMissonMonth />} />
      <Route path="/mypage/mission/week" element={<EarthMyPageMissonWeek />} />
      <Route path="/user/kakao/callback" element={<KakaoLogin />} />
      <Route path="/user/google/callback" element={<GoogleLogin />} />
      <Route path="/user/naver/callback" element={<NaverLogin />} />
      {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
      <Route path="/info" element={<EarthInfo />} />
      <Route path="/mypage/mission/group" element={<EarthMyPageMissionGroup />} />
    </Routes>
  );
};

export default Router;
