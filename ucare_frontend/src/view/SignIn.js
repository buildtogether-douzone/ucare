
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import userService from '../service/userService';
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
    backgroundColor: "#F3F3F3"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide({ history }) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const idChange = (e) => {
    setId(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const login = (e) => {
    e.preventDefault();

    let user = {
      id: id,
      password: password
    }

    userService.login(user)
    .then( res => {
      if(res.data.data) {
        console.log(user.id + '님이 성공적으로 로그인하였습니다.');
        history.push('/home');
      } else {
        console.log('로그인 정보가 없습니다.');
      }
    })
    .catch( err => {
      console.log('login() 에러', err);
    });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: '#F3F3F3'}}>
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
              id="id"
              label="id"
              name="id"
              autoComplete="id"
              autoFocus
              value={ id }
              onChange={ idChange }
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
              value={ password }
              onChange={ passwordChange }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ login }
            >
              로그인 하기
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/Home" variant="body2">
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