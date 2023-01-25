import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

import Navbar from "./Navbar";

function Layout() {

  const loggedIn = localStorage.getItem('loggedIn');

  return (
    <>
      {loggedIn &&
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                  <Typography variant="h5" noWrap component="div">
                    M<span style={{ color: "red" }}>o</span>bile
                  </Typography>
                </Link>
              </Box>

              <Link to="/logout" style={{ textDecoration: 'none', color: '#fff' }}>
                <Button edge="end" color="inherit">Logout</Button>
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

    </>
  );
}

export default Layout;
