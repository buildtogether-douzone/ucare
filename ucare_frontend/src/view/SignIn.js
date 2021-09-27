
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel, Checkbox  } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import userService from '../service/userService';
import Footer from '../layout/Footer';
import jwt from 'jwt-decode';
import { Toast } from 'primereact/toast';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    height: '100vh',
  },
  image: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflowY: 'scroll',
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "&::before":{
      content: '""',
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${require("../assets/image/his#1.jpg")})`,
      backgroundSize: 'cover',
      opacity: 0.7,
      zIndex: -1,
      position: 'fixed',
    }
  },
  paper: {
    margin: theme.spacing(20, 10, 8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 5px #BABABA',
    padding: '30px 5px 70px 5px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px'
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignInSide({ history }) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const toast = useRef(null);

  const idChange = (e) => {
    setId(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  useEffect( () => {
    !!localStorage.getItem('id') ? (setId(localStorage.getItem('id')), setCheck(true) ): null;
  }, [])

  const login = (e) => {
    e.preventDefault();

    let user = {
      id: id,
      password: password
    }
    
    userService.login(user)
    .then( res => {
      let token = res.headers.authorization;
      token = token.replace('Bearer','');
      let decoded = jwt(token);
      
      if(decoded) {
        console.log(decoded.username + '님이 성공적으로 로그인하였습니다.');
        sessionStorage.setItem('user', decoded.id);
        sessionStorage.setItem('user_no', decoded.userNo);
        sessionStorage.setItem('role', decoded.role);
        localStorage.setItem("authorization", res.headers.authorization);
        check ? (localStorage.setItem('id', id), localStorage.setItem('checked', true)) :
                (localStorage.removeItem('id'), localStorage.removeItem('checked', false))
        
        history.push(decoded.role=='관리자'? '/admin/main' :
                     decoded.role=='의사' ? '/doctor/main' :
                     decoded.role=='간호사' && '/nurse/main');
      } else {
        console.log('로그인 정보가 없습니다.');
      }
    })
    .catch( err => {
      toast.current.show({severity:'error', summary: '알림', detail:'로그인 정보가 없습니다.', life: 3000});
      console.log('login() 에러', err);
    });
  }

  const remember = (e) => {
      e.target.checked ? setCheck(true) : setCheck(false);
  }

  return (
    <Fragment>
      <Toast ref={toast} />
    <CssBaseline />
    <Grid container component="main" className={classes.image}>
      <Grid item xs={12} sm={6} md={4} />
      <Grid item xs={12} sm={8} md={4} elevation={6} >
        <div className={classes.paper}>
            <Typography component="h1" variant="h3">
                U-Care
            </Typography>
            <LocalHospitalIcon color="secondary" style={{ fontSize: 80 }}/>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
          <form className={classes.form} noValidate onKeyPress={(e) => { e.key === 'Enter' ? login(e) : null}}>
            <TextField
              variant="outlined"
              margin="normal"
              style={{backgroundColor: 'white'}}
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
              style={{backgroundColor: 'white'}}
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
            <FormControlLabel
              control={<Checkbox value="remember" checked={check} color="primary" onChange={ remember }/>}
              label="ID 저장"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ login }
            >
              로그인 하기
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} />
    </Grid>
    <Footer />
    </Fragment>
  );
}