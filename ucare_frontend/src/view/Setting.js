import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl, FormLabel, Radio, RadioGroup, StylesProvider } from '@material-ui/core';
import userService from '../service/userService';
import Footter from '../include/Footer';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import NativeSelect from '@material-ui/core/NativeSelect';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  profile: {
    paddingTop: "10px",
    paddingBottom: "10px",
    marginTop: "120px",
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf:'center',
    border: '1px solid #AAAAAA',
  },
  large: {
    width: '80%',
    height: '80%',
  },
  input: {
    display: 'none',
    marginRight: theme.spacing(70)
  },
  upload: {
    marginRight: theme.spacing(105),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300
  },
  paper: {
    marginTop: theme.spacing(20),
    marginRight: theme.spacing(60),
    width: theme.spacing(75),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    float: 'right'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(75),
  },
}));


export default function SignUp() {
  const classes = useStyles();

  const [state, setState] = useState({
    name: null,
    password1: null,
    password2: null,
    tel: null,
    email: null,
    address: null
  });

  const handleChange = (e) => {
    setState({
      [e.target.name]: e.target.value
    })
  };

  const [birth, setBirth] = useState({
    year: null,
    month: null,
    day: null,
  });

  const handleChangeBirth = (e) => {
    setBirth({
      [e.target.name]: e.target.value
    });
  };

  const [emailAt, setEmailAt] = useState({
    email: null,
    at: null
  });

  const handleChangeEmail = (e) => {
    setEmailAt({
      [e.target.name]: e.target.value
    });
  };

  const saveUser = (e) => {
    e.preventDefault();

    let user = {
      name: state.name,
      password1: state.password1,
      tel: state.tel,
      email: state.email,
      address: state.address,
      year: birth.year,
      month: birth.month,
      day: birth.day
    };

    userService.addUser(user)
      .then(res => {
        console.log(user.username + '님이 성공적으로 등록되었습니다.');
        // props.history.push('/users');
      })
      .catch(err => {
        console.log('saveUser() 에러', err);
      });
  }

  return (
    // style={{height:100vh width:100%}} 
    <Container component="main" maxWidth={false} style={{display:"flex" , overflow:'hidden'}}>
      <CssBaseline />
      <Grid item xs={6} sm={6} style={{alignItems:'right'}}>
        <div className={classes.profile}>
          <Avatar alt="Remy Sharp" src={''} className={classes.large} />
          <br />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
            <Button variant="contained" color="primary" >
              프로필 업데이트
            </Button>
        </div>
      </Grid>

      <Grid item xs={6} sm={6} style={{marginTop: '100px', marginRight: '150px'}}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름(영문 2자 이상)"
                name="name"
                autoComplete="name"
                value={state.name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="비밀번호(8자 이상)"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={state.password1 || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="비밀번호 확인"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={state.password2 || ''}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tel"
                label="전화번호"
                name="tel"
                value={state.tel || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                value={state.email || ''}
                onChange={handleChangeEmail}
              />
            </Grid>
            <FormControl variant="outlined" className={classes.formControl} style={{ width: '47%' }}>
              <InputLabel htmlFor="outlined-year-native-simple">@</InputLabel>
              <Select
                native
                value={emailAt.at || ''}
                onChange={handleChangeEmail}
                label="@"
                inputProps={{
                  name: 'at',
                  id: 'outlined-at-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>@naver.com</option>
                <option value={20}>@google.com</option>
              </Select>
            </FormControl>
            <Grid item xs={11}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="주소"
                name="address"
                autoComplete="address"
                value={state.address || ''}
                onChange={handleChange}
              />
            </Grid>
            <Link href="/_Home">
              <SearchIcon style={{ fontSize: 45, marginTop: 15 }} />
            </Link>
            <div className={classes.container} noValidate>
              <TextField
                id="date"
                label="생년월일"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveUser}
          >
            확인
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}