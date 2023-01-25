import React from "react";
import { Routes, Route } from "react-router-dom";
import CalculateLitSold from "../pages/CalculateLitSold";
import Login from "../pages/Login";
import StaffManagement from "../pages/Staff.management";
import Home from "../pages/Home";
import MasterDelete from "../pages/MasterDelete";
import DeleteStaffRecord from "../pages/DeleteStaffRecord";

const RootRouter = () => {
    return (
        <div>
            <Routes>
                <Route path = "/Staff" element={<StaffManagement />} />
                <Route path = "/CalculateLitSold" element={<CalculateLitSold />} />
                <Route path = "/" element={<Login />} />
                <Route path = "/Home" element={<Home />} />
                <Route path = "/MasterDelete" element={<MasterDelete />} />
                <Route path = "/DeleteStaffRecord" element={<DeleteStaffRecord />} />
                <Route path = "/Staff" element={<StaffManagement />} />
                <Route path = "/DeleteStaffRecord" element={<DeleteStaffRecord />} />
                

            </Routes>
        </div>
    )
}

export default RootRouter;