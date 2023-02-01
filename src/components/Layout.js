import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {

  const loggedIn = localStorage.getItem('loggedIn');
  
  const layoutToast = () => {
    toast("Logged out Successfully!");
   }

  return (
    <>
      {loggedIn &&
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h3" component="div">
                  <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                    M<span style={{ color: "red" }}>o</span>bil
                  </Link>
                </Typography>
              </Box>
              <Link to="/logout" style={{ textDecoration: 'none', color: '#fff' }}>
                <Button color="inherit" onClick={layoutToast}>Logout <LogoutIcon /></Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Navbar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />      {/* Main containt will be displayed here */}
          </Box>

        </Box>
      }

      {!loggedIn && <Navigate to='login' />}
    <ToastContainer />
    </>
  );
}

export default Layout;
