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
import StaffManagement from './components/StaffManagement';
import DeleteStaffRecord from './pages/DeleteStaffRecord';
import MasterDelete from './pages/MasterDelete';
import ProductManagement from './pages/ProductManagement';
import PumpsMangement from './pages/PumpsManagement';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' index element={<Home />} />
        <Route path='bonus/male' element={<Bonus staff="Male" />} />
        <Route path='bonus/female' element={<Bonus staff="Female" />} />
        
        <Route path='/staff-management/customer-care' element={<StaffManagement staff_type="Customer Care" />} />
        <Route path='/staff-management/senior' element={<StaffManagement staff_type="Senior" />} />
        <Route path='/staff-management/security' element={<StaffManagement staff_type="Security" />} />
        <Route path = "/DeleteStaffRecord" element={<DeleteStaffRecord />} />
        <Route path = "/MasterDelete" element={<MasterDelete />} />
        <Route path='ProductManagement' element={<ProductManagement />} />
        <Route path = "/PumpsManagement" element={<PumpsMangement />} />
        
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
