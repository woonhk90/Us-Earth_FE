import { Routes, Route } from "react-router-dom";
import EarthLogin from "../pages/EarthLogin";
import FormPage from "../pages/FormPage";
import CommunityFormPage from "../pages/CommunityFormPage";
import CommunityDetailPage from "../pages/CommunityDetailPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EarthLogin />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/community/form" element={<CommunityFormPage />} />
      <Route path="/community/detail" element={<CommunityDetailPage />} />
      {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
    </Routes>
  );
};

export default Router;
