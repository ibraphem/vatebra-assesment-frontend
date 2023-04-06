import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useStyles } from "../theme/style";
import { IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Alert, AlertTitle } from "@material-ui/lab";

const QuestionFive = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("ibrahim@vatebraassesment.com");
  const [password, setPassword] = useState("Password123");
  const [showPassword, setShowPassword] = useState(false);

  // const handleLogin = () => {
    
  // };
  return (
    <>
    <Grid container component="main" className={classes.loginRoot}>
      
      <CssBaseline />
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.formPaper}>
        <div style={{marginBottom: 15}}>
        <Alert severity="info">
        <AlertTitle style={{fontSize: 12}}><strong>Question 5: User Authentication & Persistence - Access token generation</strong></AlertTitle>
        {/* This is an info alert — <strong>check it out!</strong> */}
      </Alert>
      </div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              value={email}
              autoFocus
            />
            <TextField
             onChange={e => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default QuestionFive;
