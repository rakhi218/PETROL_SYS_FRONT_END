import { useEffect, useState } from "react";

import {

  Alert,

  Paper,

  Snackbar,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  Typography,

} from "@mui/material";

import { Container } from "@mui/system";

import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";

import axios from "axios";



function RetrenchedStaff(props) {

  let apiServerPrefix = "https://localhost:7215/api";

  if (props.staff_type === "customer-care") apiServerPrefix += "/Staff";

  else if (props.staff_type === "senior") apiServerPrefix += "/SeniorStaff";

  else if (props.staff_type === "security") apiServerPrefix += "/SecurityStaff";



  console.log(apiServerPrefix);



  const [retrenchedStaff, setRetrenchedStaff] = useState([]);

  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState({ open: false, message: "" });



  useEffect(() => {

    setLoading(true);

    axios

      .get(`${apiServerPrefix}/getRetrenchedStaffs`)

      //axios.get('https://randomuser.me/api/?results=5&inc=name,login')

      .then((res) => {

        setRetrenchedStaff(res.data);

        setLoading(false);

      })

      .catch((err) => console.log(err));

  }, []);



  const handleRecall = (e) => {

    let id = e.target.name;



    axios

      .post(apiServerPrefix + "/recallRetrench" , {tblStaffID:id})

      .then((res) => {

        if (res.status === 200) {

          setSnack({

            open: true,

            message: `Recalled: ${id}`,

          });

          setRetrenchedStaff(

            retrenchedStaff.filter((s) => s.tblStaffID !== id)

          );

        }

      })

      .catch((err) => console.log(err));

  };



  const handleSnackClose = () => {

    setSnack({ open: false, message: "" });

  };



  return (

    <>

      <Backdrop

        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}

        open={loading}

      >

        <CircularProgress color="inherit" />

      </Backdrop>



      <Snackbar

        open={snack.open}

        autoHideDuration={6000}

        anchorOrigin={{ vertical: "top", horizontal: "center" }}

        onClose={handleSnackClose}

      >

        <Alert severity="success">{snack.message}</Alert>

      </Snackbar>



      <Container maxWidth="md">

        <Typography variant="h6" gutterBottom>

          Retrenched Staff: {props.staff_type}

        </Typography>



        <TableContainer component={Paper}>

          <Table sx={{ minWidth: 650 }}>

            <TableHead>

              <TableRow>

                <TableCell>ID</TableCell>

                <TableCell align="right">Name</TableCell>

                <TableCell align="right">Recall</TableCell>

              </TableRow>

            </TableHead>



            <TableBody>

              {retrenchedStaff.map((staff) => (

                <TableRow key={staff.tblStaffID}>

                  <TableCell>{staff.tblStaffID}</TableCell>

                  <TableCell align="right">{`${staff.tblFirstName} ${staff.tblSurname}`}</TableCell>

                  <TableCell align="right">

                    <Button

                      variant="contained"

                      name={staff.tblStaffID}

                      onClick={handleRecall}

                    >

                      Recall

                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Container>

    </>

  );

}



export default RetrenchedStaff;