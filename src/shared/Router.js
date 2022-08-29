import { Routes, Route } from 'react-router-dom';
import EarthLogin from "../pages/EarthLogin";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<EarthLogin />} />
            {/* <Route path='/view/:id' element={<InstarLogin />} /> */}
        </Routes>
    );
};

export default Router;