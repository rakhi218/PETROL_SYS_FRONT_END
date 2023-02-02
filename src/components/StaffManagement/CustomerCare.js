import React, { useState,useEffect } from "react";
import { Container } from "@mui/system";
import { Button, Typography, Box, Stack, TextField, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from 'axios';
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";



import BorderedSection from "../utils/BorderedSection";


function CustomerCare() {
  
  useEffect(() => {
  async function GetStaffs() {
    try {
      const res = await axios.get("https://localhost:7215/api/Staff");
      console.log(res.data);
      const IDS=[];
      const stff=[]
      await res.data.map((record) => {
        IDS.push(record.tblStaffID);
        stff.push(record)
    })
      setStaffid(IDS);
      setStaffs(stff);
    }catch(err){
      console.log(err);
    }
  }
  GetStaffs();
},[])

async function DisplayDetails(event) {
  const staffID = event.target.value;
  SetSingleStaffID(staffID);
  const index = staffid.indexOf(staffID)
  const res = staffs[index];
  console.log();
  document.getElementById("firstname").value = res.tblFirstName;
  document.getElementById("surname").value = res.tblSurname;
  document.getElementById("sex").value = res.tblSex;
  document.getElementById("Age").value = res.tblAge;
  document.getElementById("adress").value = res.tblAddress;
  document.getElementById("phone").value = res.tblPhoneNo; 
  document.getElementById("kin_name").value = res.tblNextofKin;
  document.getElementById("kin_address").value = res.tblNOKAddress;
  document.getElementById("kin_phone").value = res.tblNOKPhone;
  document.getElementById("gurantor_name").value = res.tblStaffGuarantor;
  document.getElementById("gurantor_address").value = res.tblStaffGuarantorAddress;
  document.getElementById("gurantor_phone").value = res.tblStaffGuarantorPhone;
}

async function EditStaff() {
  setEditStaffs(!editStaffs);
}

async function RetrenchStaff() {
  const obj = {
    tblStaffID : singleId
  }
  const res = await axios.post("https://localhost:7215/api/Staff/retrench",obj);
  console.log(res); 
}

async function SuspendStaff() {
  const obj = {
    tblStaffID : singleId
  }
  const res = await axios.post("https://localhost:7215/api/Staff/suspend",obj);
  console.log(res);
}

async function SaveInfo() {

}

async function EmployStaff() {
  
}

  const [staffid, setStaffid] = useState([]);
  const [staffs,setStaffs] = useState([]);
  const [editStaffs,setEditStaffs] = useState(true);
  const [singleId,SetSingleStaffID] = useState();

  const [sex, setSex] = React.useState('');

  const handleSexChange = (event) => {
    setSex(event.target.value);
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Staff Management: CustomerCare
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{}}>
          <BorderedSection title="Staff ID Number">
            <TextField
              id="staff_id"
              name="staff_id"
              label="Staff ID"
              margin="normal"
              fullWidth
              onChange={DisplayDetails}
              select
            >
              {staffid.map((option) => (
                <MenuItem key={option} value={option} id="StaffID">
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </BorderedSection>

          

          <Stack direction="row">
            <BorderedSection title="Personal Details">
              <TextField
                id="surname"
                name="surname"
                margin="normal"
                size="small"
                required
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                id="firstname"
                name="firstname"
                margin="normal"
                size="small"
                required
                fullWidth
                disabled={editStaffs}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="sex_id">Sex</InputLabel>
                <Select
                  id="sex"
                  value={sex}
                  label="Sex"
                  required
                  onChange={handleSexChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="age"
                type="number"
                size="small"
                id="Age"
                disabled={editStaffs}
              />
              <TextField
                id="adress"
                name="address"
                margin="normal"
                size="small"
                required
                multiline
                minRows="3"
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                id="phone"
                name="phone"
                margin="normal"
                size="small"
                required
                fullWidth
                disabled={editStaffs}
              />
            </BorderedSection>
            <BorderedSection title="Picture">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Staff"
                style={{ height: "20rem" }}
              />
            </BorderedSection>
          </Stack>

          <Stack direction="row">
            <BorderedSection title="Next of kin">
              <TextField
                name="kin_name"
                margin="normal"
                size="small"
                id="kin_name"
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                name="kin_address"
                margin="normal"
                size="small"
                id="kin_address"
                required
                multiline
                minRows="3"
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                name="kin_phone"
                margin="normal"
                size="small"
                id="kin_phone"
                required
                fullWidth
                disabled={editStaffs}
              />
            </BorderedSection>
            <BorderedSection title="Staff Gurantor">
              <TextField
                name="gurantor_name"
                margin="normal"
                size="small"
                id="gurantor_name"
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                name="gurantor_address"
                margin="normal"
                size="small"
                id="gurantor_address"
                required
                multiline
                minRows="3"
                fullWidth
                disabled={editStaffs}
              />
              <TextField
                name="gurantor_phone"
                margin="normal"
                size="small"
                id="gurantor_phone"
                required
                fullWidth
                disabled={editStaffs}
              />
            </BorderedSection>
          </Stack>

          <BorderedSection title="Management">
            <Container maxWidth="sm">
              <Stack direction="row" spacing={3}>
                <Button
                  type="button"
                  variant="contained"
                  disabled={false}
                  onClick={EmployStaff}
                >
                  Employ Staff
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  disabled={false}
                  onClick={EditStaff}
                >
                  Edit Staff Information
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  disabled={false}
                  onClick={SaveInfo}
                >
                  Save Staff Information
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={RetrenchStaff}
                >
                  Retrench Staff
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={SuspendStaff}
                >
                  Suspend Staff
                </Button>
              </Stack>
            </Container>
          </BorderedSection>
        </Box>

        <Divider variant="middle" />

        <BorderedSection title="Recall">
          <Container maxWidth="sm">
            <Stack direction="row" spacing={3}>
              <Button
                component={Link}
                to={`/staff-management/customer-care/suspended-staff`}
                variant="contained"
                color="success"
              >
                Suspended Staff
              </Button>
              <Button
                component={Link}
                to={`/staff-management/customer-care/retrenched-staff`}
                variant="contained"
                color="success"
              >
                Retrenched Staff
              </Button>
            </Stack>
          </Container>
        </BorderedSection>
      </Container>
    </>
  );
}

export default CustomerCare;