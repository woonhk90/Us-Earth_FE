import { Routes, Route } from "react-router-dom";
import EarthLogin from "../pages/EarthLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import EarthCommunityForm from "../pages/EarthCommunityForm";
import EarthCommunityFormEdit from "../pages/EarthCommunityFormEdit";
import EarthCommunity from "../pages/EarthCommunity";
import EarthCommunityDetail from "../pages/EarthCommunityDetail";
import EarthCommunityCertify from "../pages/EarthCommunityCertify";
import EarthCommunityCertifyForm from "../pages/EarthCommunityCertifyForm";
import EarthMyPage from "../pages/EarthMyPage";
import EarthMyPageSetting from "../pages/EarthMyPageSetting";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EarthCommunity />} />
      <Route path="/login" element={<EarthLogin />} />
      <Route path="/community/form" element={<EarthCommunityForm />} />
      <Route path="/community/edit/:id" element={<EarthCommunityFormEdit />} />
      <Route path="/community" element={<EarthCommunity />} />
      <Route path="/community/detail/:id" element={<EarthCommunityDetail />} />
      <Route path="/community/certify" element={<EarthCommunityCertify />} />
      <Route path="/community/certify/form" element={<EarthCommunityCertifyForm />} />
      <Route path="/mypage" element={<EarthMyPage />} />
      <Route path="/mypage/setting" element={<EarthMyPageSetting />} />
      <Route path="/user/kakao/callback" element={<KakaoLogin />} />
      <Route path="/user/google/callback" element={<GoogleLogin />} />
      <Route path="/user/naver/callback" element={<NaverLogin />} />
      {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
    </Routes>
  );
};

export default Router;
