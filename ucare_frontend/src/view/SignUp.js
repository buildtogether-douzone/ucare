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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [ssn, setSsn] = useState('');
  const [address, setAddress] = useState('');
  const [telNo, setTelNo] = useState('');
  const [role, setRole] = useState('');
  const [remark, setRemark] = useState('');

  const idChange = (e) => {
    setId(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const hasError = passwordEntered =>
    password.length < 5 ? true : false;

  const hasNotSameError = passwordEntered =>
    password != confirmPassword ? true : false; 

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const genderChange = (e) => {
    setGender(e.target.value)
  }

  const ssnChange = (e) => {
    setSsn(e.target.value)
  }

  const addressChange = (e) => {
    setAddress(e.target.value)
  }

  const telNoChange = (e) => {
    setTelNo(e.target.value)
  }

  const roleChange = (e) => {
    setRole(e.target.value)
  }

  const saveUser = (e) => {
    e.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레시 되는 것을 막는다.

    if(password !== confirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let user = {
      id: id,
      password: password,
      name: name,
      gender: gender,
      ssn: ssn,
      address: address,
      telNo: telNo,
      role: role,
      remark: remark
    }

    userService.addUser(user)
    .then( res => {
        console.log(user.name + '님이 성공적으로 등록되었습니다.');
        history.push('/');
    })
    .catch( err => {
      console.log('saveUser() 에러', err);
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                value={ id }
                onChange={ idChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
                label="비밀번호(5자 이상)"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ password }
                onChange={ passwordChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
                helperText={
                  hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                } // 에러일 경우에만 안내 문구 표시
                label="비밀번호 확인"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={ confirmPassword }
                onChange={ confirmPasswordChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={ name }
                onChange={ nameChange }
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" value={ gender } onChange={ genderChange } >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ssn"
                label="주민등록번호"
                name="ssn"
                value={ ssn }
                onChange={ ssnChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="주소"
                name="address"
                autoComplete="address"
                value={ address }
                onChange={ addressChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="telNo"
                label="연락처"
                name="telNo"
                value={ telNo }
                onChange={ telNoChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                label="역할"
                name="role"
                value={ role }
                onChange={ roleChange }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="약관에 동의합니다."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ saveUser }
          >
            확인
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Footter />
    </Container>
  );
}