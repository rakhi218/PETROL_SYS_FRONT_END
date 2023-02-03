import { Navigate } from "react-router-dom";


function Logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('Token');
  return <Navigate to='/login' />
}

export default Logout;
