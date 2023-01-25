import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

  // const [username, setUsername] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post("https://localhost:7223/api/AdminLogin",{tblUsername : data.get('username'),tblPassword : data.get('password')});
      if (res.data.result) {
        localStorage.setItem('loggedIn', true);
        navigate('/');
      }
      else {
        setError(true);
      }
    }catch(err){
      console.log(error);
    }
    
  };

  // const handleUsernameChange = (e) => {
  //   setUsername(e.value);
  // }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
        {error && <Alert severity="error">Wrong Username or Password!</Alert>}
      </Container>
    </>
  );
}

export default Login;
