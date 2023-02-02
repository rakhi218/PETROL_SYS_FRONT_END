import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import Bonus from './components/Bonus';
import About from './components/About';
import Logout from './components/logout';
import CustomerCare from './components/StaffManagement/CustomerCare';
import SecurityStaff from './components/StaffManagement/SecurityStaff';
import SeniorStaff from './components/StaffManagement/SeniorStaff';
import DeleteStaffRecord from './pages/DeleteStaffRecord';
import MasterDelete from './pages/MasterDelete';
import ProductManagement from './pages/ProductManagement';
import PumpsMangement from './pages/PumpsManagement';
import Sales from './pages/Sales';
import CalculateLitSold from './pages/CalculateLitSold';
import SuspendedStaff from './components/StaffManagement/SuspendedStaff';
import RetrenchedStaff from './components/StaffManagement/RetrenchedStaff';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' index element={<Home />} />
        <Route path='bonus/male' element={<Bonus staff="Male" />} />
        <Route path='bonus/female' element={<Bonus staff="Female" />} />

        <Route path='staff-management/customer-care/'>
          <Route path='' index element={<CustomerCare />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="customer-care" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="customer-care" />} />
        </Route>

        <Route path='staff-management/senior/'>
          <Route path='' index element={<SeniorStaff />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="senior" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="senior" />} />
        </Route>

        <Route path='staff-management/security/'>
          <Route path='' index element={<SecurityStaff />} />
          <Route path='suspended-staff' element={<SuspendedStaff staff_type="security" />} />
          <Route path='retrenched-staff' element={<RetrenchedStaff staff_type="security" />} />
        </Route>
        
        <Route path='/staff-management/customer-care' element={<CustomerCare />} />
        <Route path='/staff-management/senior' element={<SeniorStaff />} />
        <Route path='/staff-management/security' element={<SecurityStaff />} />
        <Route path = "/DeleteStaffRecord" element={<DeleteStaffRecord />} />
        <Route path = "/MasterDelete" element={<MasterDelete />} />
        <Route path='ProductManagement' element={<ProductManagement />} />
        <Route path = "/PumpsManagement" element={<PumpsMangement />} />
        <Route path="/Staff" element={<Sales/>}/>
        <Route path="/CalculateLitSold" element={<CalculateLitSold/>}/>
        
        <Route path='about' element={<About />} />
        
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </>
  )

);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
