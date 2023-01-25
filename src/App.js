import './frontend.css';
import ProductManagement from './pages/ProductManagement'
import StaffManagement from './pages/Staff.management'
import MasterDelete from './pages/MasterDelete';
import DeleteStaffRecord from './pages/DeleteStaffRecord';
import Bonus from './components/Bonus';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";

import Layout from './components/Layout';
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About';
import Logout from './components/logout';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' index element={<Home />} />
        <Route path='bonus/male' element={<Bonus staff="Male" />} />
        <Route path='bonus/female' element={<Bonus staff="Female" />} />
        <Route path='about' element={<About />} />
        <Route path='bonus/female' element={<Bonus staff="Female" />} />
        <Route path='ProductManagement' element={<ProductManagement />} />
        <Route path = "/Staff" element={<StaffManagement />} />
        <Route path = "/MasterDelete" element={<MasterDelete />} />
        <Route path = "/DeleteStaffRecord" element={<DeleteStaffRecord />} />
        <Route path = "/Bonus" element={<Bonus />} />
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
