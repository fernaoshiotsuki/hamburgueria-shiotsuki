import { Route, Routes } from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import Home from "../Pages/Home";
import Register from "../Pages/Register";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashBoard" element={<DashBoard />} />
    </Routes>
  );
};
export default RoutesComponent;
