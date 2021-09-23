import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import userService from '../../service/userService';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Container from '@material-ui/core/Container';

import SearchIcon from '@material-ui/icons/Search';
import DaumPostcode from "react-daum-postcode";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid white',
    backgroundColor: '#FFFFFF'
  },
  form: {
    width: '100%',
  },
  font: {
    width: '30%',
    float: 'left',
    height: '100%',
    paddingTop: '12px',
    paddingLeft: '5px',
    paddingRight: '10px',
    backgroundColor: '#E7E7E7'
  },
  input: {
    width: '65%',
    float: 'left',
    padding: '5px',
    backgroundColor: '#FFFFFF',
  },
  radio: {
    width: '50%',
    float: 'left',
    paddingLeft: '8px'
  },
  textField: {
    display: 'inline-block',
    float: 'right'
  },
  title: {
    padding: theme.spacing(1),
    border: '1px solid #DFDFDF',
    width: '100%',
    backgroundColor: '#DFDFDF',
    borderRadius: '10px 10px 0 0',
    fontWeight: 550,
    color: '#656565'
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [ssn, setSSN] = useState('');
  const [email, setEmail] = useState('email@co.kr');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [telNo, setTelNo] = useState('');
  const [role, setRole] = useState('');
  const [remark, setRemark] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const options = ['의사', '간호사'];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (ssn.length === 13) {
      setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
    }
  }, [ssn, telNo]);

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


  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const hasNotValidError = emailEntered =>
    regex.test(email) ? false : true; 


  const nameChange = (e) => {
    setName(e.target.value)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const genderChange = (e) => {
    setGender(e.target.value)
  }

  const ssnChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setSSN(e.target.value);
    }
  }

  const addressChange = (e) => {
    setAddress(e.target.value)
  }

  const detailAddressChange = (e) => {
    setDetailAddress(e.target.value)
  }

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const roleChange = (e) => {
    setRole(e.target.value)
  }

  const openPostCode = () => {
    setIsPopupOpen(true)
  };

  const closePostCode = () => {
    setIsPopupOpen(false)
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode)
    setAddress(fullAddress);
    closePostCode();
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
      email: email,
      address: address,
      detailAddress: detailAddress,
      telNo: telNo,
      role: role,
      remark: remark
    }

    userService.addUser(user)
    .then( res => {
        console.log(user.name + '님이 성공적으로 등록되었습니다.');
    })
    .catch( err => {
      console.log('saveUser() 에러', err);
    });
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h6" className={classes.title}>회원가입</Typography>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">ID</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="outlined-name"
                name="id"
                autoComplete="id"
                value={id}
                onChange={ idChange }
              />
            </Grid>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">비밀번호</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                label="비밀번호(5자 이상)"
                size="small"
                id="outlined-password"
                name="password"
                type="password"
                error={hasError('password')} // 해당 텍스트필드에 error 핸들러 추가
                autoComplete="current-password"
                value={password}
                onChange={passwordChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">비밀번호 확인</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                error={hasNotSameError('confirmPassword')} // 해당 텍스트필드에 error 핸들러 추가
                helperText={
                  hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
                } // 에러일 경우에만 안내 문구 표시
                autoComplete="current-password"
                value={confirmPassword}
                onChange={confirmPasswordChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">이름</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={nameChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">주민등록번호</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="outlined-ssn"
                name="ssn"
                autoComplete="ssn"
                value={ssn}
                onChange={ssnChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">성별</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={genderChange} >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="여자"
                    labelPlacement="end"
                    value="female"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="남자"
                    labelPlacement="end"
                    value="male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">연락처</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="telNo"
                name="telNo"
                value={telNo}
                onChange={telNoChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">주소</Typography>
              <TextField
                className={classes.input}
                style={{ backgroundColor: '#FFFFFF', width: '58%' }}
                variant="outlined"
                required
                size="small"
                id="firstAddress"
                name="firstAddress"
                autoComplete="firstAddress"
                value={address}
                onChange={addressChange}
              />
              <SearchIcon onClick={openPostCode} style={{ fontSize: '30px', marginTop: '10px', cursor: 'pointer' }} />
              <Dialog
                open={isPopupOpen}
                onClose={closePostCode}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'sm'}
              >
                <DialogTitle id="form-dialog-title">주소 찾기</DialogTitle>
                <DialogContent>
                  <DaumPostcode
                    onComplete={handlePostCode}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closePostCode} color="primary">닫기</Button>
                </DialogActions>
              </Dialog>
              <TextField
                className={classes.input}
                style={{ backgroundColor: '#FFFFFF' }}
                variant="outlined"
                size="small"
                id="detailAddress"
                name="detailAddress"
                autoComplete="detailAddress"
                value={detailAddress}
                onChange={detailAddressChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">이메일</Typography>
              <TextField
                className={classes.input}
                style={{ backgroundColor: '#FFFFFF' }}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="email"
                name="email"
                autoComplete="email"
                error={hasNotValidError('email')}
                helperText={
                  hasNotValidError('email') ? "이메일 주소를 다시 확인해주세요." : null
                }
                value={email}
                onChange={emailChange}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1" align="right">역할</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="role" name="role" value={role} onChange={roleChange} >
                  <FormControlLabel
                    value="의사"
                    control={<Radio color="primary" />}
                    label="의사"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="간호사"
                    control={<Radio color="primary" />}
                    label="간호사"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

          </Grid>

          <Button
            style={{ backgroundColor: '#616161', float: 'right', margin: '5px' }}
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            onClick={saveUser}
          >
            등록하기
          </Button>
        </form>
      </div>
    </Container>
  );
}