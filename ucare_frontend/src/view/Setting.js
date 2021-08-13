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
import { FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core';
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
  roots: {
    height: '100vh',
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
    marginRight: theme.spacing(70)
  },
  upload: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(50),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300
  },
  paper: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(20),
    width: 400,
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
    width: 400
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
      [e.target.name] : e.target.value
    })
  };

  const [birth, setBirth] = useState({
    year: null,
    month: null,
    day: null,
  });

  const handleChangeBirth = (e) => {
    setBirth({
      [e.target.name] : e.target.value
    });
  };

  const [emailAt, setEmailAt] = useState({
    email: null,
    at: null
  });

  const handleChangeEmail = (e) => {
    setEmailAt({
      [e.target.name] : e.target.value
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
    .then( res => {
        console.log(user.username + '님이 성공적으로 등록되었습니다.');
        // props.history.push('/users');
    })
    .catch( err => {
      console.log('saveUser() 에러', err);
    });
  }

  return (
    <Grid container component="main" className={classes.roots}>  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
      <Avatar src="/broken-image.jpg" >
      </Avatar>
  </div>
      <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          프로필 업데이트
        </Button>
      </label>
    </div>
      <div className={classes.paper}>
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
                value={ state.name || '' }
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                value={state.email || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="emails"
                label="이메일s"
                name="emails"
                autoComplete="email"
                value={emailAt.email || ''}
                onChange={handleChangeEmail}
              />
            </Grid>
            <FormControl variant="outlined" className={classes.formControl} style={ {width: '46%'} }>
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
            <Grid item xs={10}>
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
            <SearchIcon style={{ fontSize: 50, marginTop:8 }}/>
            </Link>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-year-native-simple">년</InputLabel>
        <Select
          native
          value={birth.year || ''}
          onChange={handleChangeBirth}
          label="Year"
          inputProps={{
            name: 'year',
            id: 'outlined-year-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>      
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-month-native-simple">월</InputLabel>
        <Select
          native
          value={birth.month || ''}
          onChange={handleChangeBirth}
          label="Month"
          inputProps={{
            name: 'month',
            id: 'outlined-month-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>      
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-day-native-simple">일</InputLabel>
        <Select
          native
          value={birth.day || ''}
          onChange={handleChangeBirth}
          label="Day"
          inputProps={{
            name: 'day',
            id: 'outlined-day-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>      
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
      </div>
      <Footter />
    </Container>
    </Grid>
  );
}