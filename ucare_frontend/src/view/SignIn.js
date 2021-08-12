
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../include/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${require("../assets/image/his#1.jpg")})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '100% 100%',
    backgroundPosition: 'left',
  },
  paper: {
    margin: theme.spacing(25, 10, 8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Typography component="h1" variant="h3">
                U-Care
            </Typography>
            <LocalHospitalIcon color="secondary" style={{ fontSize: 80 }}/>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="id"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Link href="/_Home">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                로그인 하기
                </Button>
            </Link>
            <Grid container>
              <Grid item xs>
                <Link href="/_Home" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2" style={{ fontSize: 15 }}>
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>
            <Footer />
          </form>
        </div>
      </Grid>
    </Grid>
  );
}