import { Routes, Route } from "react-router-dom";
import EarthLogin from "../pages/EarthLogin";
import FormPage from "../pages/FormPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EarthLogin />} />
      <Route path="/form" element={<FormPage />} />
      {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
    </Routes>
  );
};

export default Router;
