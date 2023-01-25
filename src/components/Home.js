import React from "react";
import Typography from '@mui/material/Typography';
import Container from "@mui/system/Container";


function Home() {
  return (
    <Container>
      <Typography variant="h1" align="center" color="blue" sx={{ fontWeight: "bold", textDecoration: "underline" }}>
        M<span style={{ color: 'red' }}>o</span>bile
      </Typography>
    </Container>
  )
}

export default Home;
