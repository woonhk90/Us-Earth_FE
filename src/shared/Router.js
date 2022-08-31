import { Routes, Route } from 'react-router-dom';
import EarthLogin from "../pages/EarthLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import EarthCommunity from '../pages/EarthCommunity';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<EarthLogin />} />
            <Route path="/Community" element={<EarthCommunity />} />
            <Route path="/user/kakao/callback" element={<KakaoLogin />} />
            <Route path="/user/google/callback" element={<GoogleLogin />} />
            <Route path="/user/naver/callback" element={<NaverLogin />} />
            {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
        </Routes>
    );
};

export default Router;