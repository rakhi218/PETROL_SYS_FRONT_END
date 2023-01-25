import { Navigate } from "react-router-dom";


function Logout() {
  localStorage.removeItem('loggedIn');
  return <Navigate to='/login' />
}

export default Logout;
