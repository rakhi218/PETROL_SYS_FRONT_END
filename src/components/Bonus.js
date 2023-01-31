import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import InputAdornment from "@mui/material/InputAdornment";
import NumbersIcon from '@mui/icons-material/Numbers';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";

import BorderedSection from "./utils/BorderedSection";



function InputWithAbdorment(props) {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <props.icon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

function Bonus({ staff }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Changes Saved");
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Bonus: {staff} Staff
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{}}>
          <BorderedSection title="Attendance">
            <TextField id="ifPresent" name="ifPresent" label="If Present" margin="normal" fullWidth />
            <TextField id="ifAbsent" name="ifAbsent" label="If Absent" margin="normal" fullWidth />
          </BorderedSection>

          <Stack direction="row">
            <BorderedSection title="Target Sales - PMS">
              <TextField id="Morning" name="pms-morning" label="Morning" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="pms-morning-n" type="number" icon={NumbersIcon} size="small" />
              <TextField id="Night" name="pms-night" label="Night" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="pms-night-n" type="number" icon={NumbersIcon} size="small" />
            </BorderedSection>
            <BorderedSection title="Target Sales - DPK">
              <TextField id="Morning" name="dpk-morning" label="Morning" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="dpk-morning-n" type="number" icon={NumbersIcon} size="small" />
              <TextField id="Night" name="dpk-night" label="Night" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="dpk-night-n" type="number" icon={NumbersIcon} size="small" />
            </BorderedSection>
          </Stack>

          <Stack direction="row">
            <BorderedSection title="Target Sales - AGO">
              <TextField id="Morning" name="ago-morning" label="Morning" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="ago-morning-n" type="number" icon={NumbersIcon} size="small" />
              <TextField id="Night" name="ago-night" label="Night" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="ago-night-n" type="number" icon={NumbersIcon} size="small" />
            </BorderedSection>
            <BorderedSection title="Target Sales - Bulk Oil">
              <TextField id="Morning" name="bulkoil-morning" label="Morning" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="bulkoil-morning-n" type="number" icon={NumbersIcon} size="small" />
              <TextField id="Night" name="dpk-night" label="Night" margin="normal" fullWidth />
              <InputWithAbdorment label="N" name="bulkoil-night-n" type="number" icon={NumbersIcon} size="small" />
            </BorderedSection>
          </Stack>

          <Container maxWidth="sm">
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Save Changes
            </Button>
          </Container>
        </Box>


      </Container>
    </>
  )
}

export default Bonus;