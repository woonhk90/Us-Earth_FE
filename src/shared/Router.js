import { Routes, Route } from 'react-router-dom';
import EarthLogin from "../pages/EarthLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import EarthCommunity from '../pages/EarthCommunity';
import EarthCommunityDetail from '../pages/EarthCommunityDetail';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<EarthCommunity />} />
            <Route path='/login' element={<EarthLogin />} />
            <Route path="/community" element={<EarthCommunity />} />
            <Route path="/community/detail/:id" element={<EarthCommunityDetail />} />
            <Route path="/user/kakao/callback" element={<KakaoLogin />} />
            <Route path="/user/google/callback" element={<GoogleLogin />} />
            <Route path="/user/naver/callback" element={<NaverLogin />} />
        </Routes>
    );
};

export default Router;