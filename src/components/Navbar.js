import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

export default function Navbar() {

  const [openOperations, setOpenOperations] = React.useState(false);
  const [openBonus, setOpenBonus] = React.useState(false);
  const [openStaffManagement, setOpenStaffManagement] = React.useState(false);
  const [openReports, setOpenReports] = React.useState(false);
  const navigate = useNavigate();

  const handleOperationsClick = (e) => {
    setOpenOperations(!openOperations);
  };
  const handleBonusClick = () => {
    setOpenBonus(!openBonus);
  };
  const handleStaffManagementClick = () => {
    setOpenStaffManagement(!openStaffManagement);
  };
  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };


  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#e7e9eb', },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>

            <Box>
              <ListItemButton onClick={handleOperationsClick}>
                <ListItemText primary={"Operations"} />
                <ListItemIcon>{openOperations ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItemButton>
              <Collapse in={openOperations} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText onClick={()=>navigate("/Staff")} primary="Sales" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={()=>navigate("/MasterDelete")} primary="Remove Pump Record" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText onClick={()=>navigate("/DeleteStaffRecord")} primary="Remove Staff Entry" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton>
                <ListItemText onClick={()=>navigate("/ProductManagement")} primary={"Pumps Management"} / >
              </ListItemButton>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton onClick={handleBonusClick}>
                <ListItemText primary={"Bonus"} />
                <ListItemIcon>{openBonus ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItemButton>
              <Collapse in={openBonus} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton component={NavLink} to={"/bonus/male"} sx={{ pl: 4 }}>
                    <ListItemText primary="Male Staff" />
                  </ListItemButton>
                  <ListItemButton component={NavLink} to={"/bonus/female"} sx={{ pl: 4 }}>
                    <ListItemText primary="Female Staff" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton onClick={handleReportsClick}>
                <ListItemText primary={"Reports"} />
                <ListItemIcon>{openReports ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItemButton>
              <Collapse in={openReports} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Report A" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Report B" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton onClick={handleStaffManagementClick}>
                <ListItemText primary={"Staff Management"} />
                <ListItemIcon>{openStaffManagement ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
              </ListItemButton>
              <Collapse in={openStaffManagement} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton component={NavLink} to={"/staff-management/customer-care"} sx={{ pl: 4 }}>
                    <ListItemText primary="Customer Care" />
                  </ListItemButton>
                  <ListItemButton component={NavLink} to={"/staff-management/senior"} sx={{ pl: 4 }}>
                    <ListItemText primary="Senior Staff" />
                  </ListItemButton>
                  <ListItemButton component={NavLink} to={"/staff-management/security"} sx={{ pl: 4 }}>
                    <ListItemText primary="Security" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton>
                <ListItemText primary={"Reports"} />
              </ListItemButton>
            </Box>

            <Divider variant='middle' />

            <Box>
              <ListItemButton component={NavLink} to={"/about"}>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </Box>

          </List>
        </Box>
      </Drawer>

    </>
  );
}