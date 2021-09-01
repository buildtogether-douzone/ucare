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
    margin: theme.spacing(5),
    width: '50% '
  },
  paper: {
    width: '30%',
    float: 'left',
    marginTop:'1%',
    alignItems: 'center',
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  image: {
    display: 'block',
    top: 80,
    right: 80,
    float: 'left',
    marginTop:'1%',
    marginRight: '80px',
    marginLeft: '10%'
  },
  profile: {
    display: 'block',
    width: '200px',
    height: '230px',
    border: '1px solid #AAAAAA',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%, 100%',
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
  const [emailId, setEmailId] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');

  useEffect(() => {
    let user = {
      id: sessionStorage.getItem('user')
    };

    const newDate = new Date();
    const date = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();

    userService.fetchUserByID(user)
      .then(res => {
        setName(res.data.name);
        setPassword(res.data.password);
        setConfirmPassword(res.data.password);
        setTelNo(res.data.telNo);
        setAddress(res.data.address);
        setEmailId(res.data.emailId);
        setEmail(res.data.email);
        setPreviewURL(res.data.image);
        res.data.birth ? setBirth(res.data.birth) : setBirth(`${year}-${month}-${date}`);
      })
      .catch(err => {
        console.log('updateUser() 에러', err);
      });
  }, []);

  useEffect(() => {
    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [telNo])

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const hasError = passwordEntered =>
    password.length < 5 ? true : false;

  const hasNotSameError = passwordEntered =>
    password != confirmPassword ? true : false;




  const saveUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    };

    let user = {
      id: window.sessionStorage.getItem('user'),
      name: name,
      password: password,
      telNo: telNo,
      email: (emailId + '@' + email),
      address: address,
      birth: birth
    }

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: "application/json"}));
    formData.append('file', file || null);

    userService.updateUser(formData)
      .then(res => {
        console.log(user.name + '님의 정보가 성공적으로 수정되었습니다.');
      })
      .catch(err => {
        console.log('updateUser() 에러', err);
      });
  };

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <SiteLayout >
      <div style={{marginLeft: '10%', marginTop:'2%'}}>
        <Typography component="h1" variant="h4">
            프로필 수정
        </Typography>
      </div>
      <div className={classes.image} >
        <div className={classes.profile}
          style={previewURL == null ? 
            { backgroundImage: `url(${require("../assets/image/profile.jpg")})` } 
              : { backgroundImage: `url(${previewURL})` }
        } />
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          component="label"
          startIcon={
            <span>
              <CloudUploadIcon style={{ padding: '5px 0 0 0' }} /><span style={{ padding: '0 0 0px 2px' }}>Upload</span>
            </span>
          }>
          <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" onChange={handleFileOnChange} />
        </Button>
      </div>
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
              value={name}
              onChange={(e) => { setName(e.target.value) }}
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
              autoComplete="current-password"
              label="비밀번호(5자 이상)"
              error={hasError('password')}
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
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
              autoComplete="current-password"
              label="비밀번호 확인"
              error={hasNotSameError('confirmPassword')}
              helperText={
                hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
              }
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value) }}
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
              value={telNo}
              onChange={telNoChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography className={classes.font} variant="body1">이메일</Typography>
            <TextField
              style={{ float: 'left', width: '45%', backgroundColor: '#FFFFFF' }}
              variant="outlined"
              required
              fullWidth
              id="emailId"
              name="emailId"
              autoComplete="email"
              value={emailId}
              onChange={(e) => { setEmailId(e.target.value) }}
            />
            <Typography className={classes.font} style={{ float: 'left', width: '10%', padding: '2%', textAlign: 'center' }} variant="body1">@</Typography>
            <FormControl variant="outlined" style={{ float: 'left', width: '45%', backgroundColor: '#FFFFFF' }}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={'naver.com'}>naver.com</MenuItem>
                <MenuItem value={'daum.net'}>daum.net</MenuItem>
                <MenuItem value={'gmail.com'}>gmail.com</MenuItem>
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.font} variant="body1">주소</Typography>
            <TextField
              style={{ width: '85%', backgroundColor: '#FFFFFF' }}
              variant="outlined"
              required
              fullWidth
              id="address"
              name="address"
              autoComplete="address"
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
            />
            <SearchIcon style={{ fontSize: '45', width: '15%' }} />
          </Grid>


          <Grid item xs={12}>
            <Typography className={classes.font} variant="body1">생년월일</Typography>
            <TextField
              fullWidth
              id="date"
              type="date"
              value={birth}
              onChange={(e) => { setBirth(e.target.value) }}
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
            onClick={saveUpdate}
            disableElevation
          >
            변경하기
          </Button>
        </Grid>
      </form>
    </SiteLayout>
  );
}