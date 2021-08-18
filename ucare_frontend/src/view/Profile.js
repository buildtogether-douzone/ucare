import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import userService from '../service/userService';
import SiteLayout from '../layout/SiteLayout';


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    margin: theme.spacing(10),

  },
  paper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  profile: {
    display: 'block',
    width: '200px',
    height: '230px',
    border: '1px solid #AAAAAA',
    backgroundImage: `url(${require("../assets/image/profile.jpg")})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
  button: {
    display: 'block',
    width: '200px',
    height: '40px'
  }

}));


export default function Profile() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telNo, setTelNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  
  
  useEffect(() => {
    const newDate = new Date()
    const date = ('0'+ newDate.getDate()).slice(-2);
    const month = ('0'+( newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    setBirth(`${year}-${month}-${date}`);

    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [telNo]);


  const hasError = passwordEntered =>
  password.length < 5 ? true : false;

  const hasNotSameError = passwordEntered =>
  password != confirmPassword ? true : false; 

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const saveUpdate = (e) => {

    e.preventDefault();
    if(password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    };

  let user = {
    name: name,
    password: password,
    telNo: telNo,
    email: email,
    address: address,
    birth: birth
  }

  userService.updateUser(user)
  .then( res => {
    console.log(user.name + '님의 정보가 성공적으로 수정되었습니다.');
    history.push('/update');
  })
  .catch( err => {
    console.log('updateUser() 에러', err);
  });
};

  return (
    <SiteLayout >
    <div className={classes.root}>
      <Grid container spacing={10}>

        <Grid style={{ position: 'relative' }} item xs={12} sm={5}>
          <div style={{ display: 'block', position: 'absolute', top: 80, right: 80 }} >
            <div className={classes.profile} />
            <Button
              className={classes.button}
              variant="contained"
              color="default"
              startIcon={
                <span>
                  <CloudUploadIcon style={{ padding: '5px 0 0 0' }} /><span style={{ padding: '0 0 0px 2px' }}>Upload</span>
                </span>
              }>

            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={7}>
          <form className={classes.paper} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">이름</Typography>
                <TextField
                  style={{ backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={ name }
                  onChange={ (e) => { setName(e.target.value)} }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">비밀번호</Typography>
                <TextField
                  style={{ backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  label="비밀번호(5자 이상)"
                  error={ hasError('password') }
                  value={ password }
                  onChange={ (e) => { setPassword(e.targe.value)} }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">비밀번호 확인</Typography>
                <TextField
                  style={{ backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  label="비밀번호 확인"
                  error={ hasNotSameError('confirmPassword')}
                  helperText={
                    hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                  }
                  value={ confirmPassword }
                  onChange={ (e) => { setConfirmPassword(e.target.value)} }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">전화번호</Typography>
                <TextField
                  style={{ backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="telNo"
                  name="telNo"
                  autoComplete="telNo"
                  value={ telNo }
                  onChange={ telNoChange }
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">이메일</Typography>
                <TextField
                  style={{ width: '45%', float: 'left', backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={ email }
                  onChange={ (e) => { setEmail(e.target.value)} }
                />
                <Typography className={classes.font} style={{ width: '10%', float: 'left', padding: '2%', textAlign: 'center' }} variant="body1">@</Typography>
                <FormControl variant="outlined" style={{ width: '45%', float: 'left', backgroundColor: '#FFFFFF' }}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={name}
                    onChange={setName}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'@google.com'}>google.com</MenuItem>
                    <MenuItem value={20}>naver.com</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">주소</Typography>
                <TextField
                  style={{ width: '85%', float: 'left', backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  name="address"
                  autoComplete="address"
                  value={ address }
                  onChange={ (e) => { setAddress(e.target.value)} }
                />
                <SearchIcon style={{ float: 'left', fontSize: '45', width: '15%' }} />
              </Grid>


              <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">생년월일</Typography>
                <TextField
                  style={{ width: '100%' }}
                  id="date"
                  type="date"
                  value={ birth }
                  onChange={ (e) => { setBirth(e.targer.value)} }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Button 
                  style={{ width: '100%', marginTop: '5%' }} 
                  variant="contained" 
                  color="primary" 
                  href="/Home"
                  type="submit"
                  onClick={ saveUpdate }
                  disableElevation
                >
                등록하기
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
    </SiteLayout>
  );
}