import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import patientService from '../../service/patientService';
import DaumPostcode from "react-daum-postcode";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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


export default function NewPatient() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [ssn, setSSN] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('여');
  const [telNo, setTelNo] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [emailId, setEmailId] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('Y');
  const [diagType, setDiagType] = useState('초진');
  const [visitDate, setVisitDate] = useState('');
  const [remark, setRemark] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const newDate = new Date();
    const date = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    setVisitDate(`${year}-${month}-${date}`);

    const getGender = ssn.substr(7, 1)

    if (getGender % 2 == 1) {
      setGender('남');
    } else {
      setGender('여');
    };

    let ageYear = 0;

    if (getGender <= 2) {
      ageYear = "19"
    } else {
      ageYear = "20"
    };

    const ageNum = ageYear.concat(ssn.substr(0, 2));
    const monthDay = month + date;
    setAge(monthDay < ssn.substr(2, 4) ? year - ageNum - 1 : year - ageNum);

    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (ssn.length === 13) {
      setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
    }
  }, [ssn, telNo, gender, age])

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const create = (e) => {
    e.preventDefault();

    let patient = {
      name: name,
      ssn: ssn,
      age: age,
      gender: gender,
      telNo: telNo,
      address: address,
      detailAddress: detailAddress,
      domain: (emailId + '@' + email),
      insurance: insurance,
      diagnosis: diagType,
      visitDate: visitDate,
      remark: remark,
      userId: window.sessionStorage.getItem('user')
    }

    patientService.create(patient)
      .then(res => {
        console.log(patient.name + '님의 정보가 성공적으로 등록되었습니다.');
        window.location.reload();
      })
      .catch(err => {
        console.log('create() 에러', err);
      });

  };

  const onReset = () => {
    setName('');
    setSSN('');
    setAge('');
    setGender('');
    setTelNo('');
    setAddress('');
    setDetailAddress('');
    setEmailId('');
    setEmail('');
    setInsurance('');
    setRemark('');
  };
  
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

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h6" className={classes.title}>환자 등록</Typography>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">이름</Typography>
              <TextField
                style={{ backgroundColor: '#FFFFFF' }}
                className={classes.input}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="outlined-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">주민등록번호</Typography>
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
                onChange={(e) => { setSSN(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">성별</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={(e) => { setGender(e.target.value) }} >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="여자"
                    labelPlacement="end"
                    value="여"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="남자"
                    labelPlacement="end"
                    value="남"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">연락처</Typography>
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
              <Typography className={classes.font} variant="body1">주소</Typography>
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
                onChange={(e) => { setAddress(e.target.value) }}
              />
              <SearchIcon onClick={openPostCode} style={{ fontSize: '30px', marginTop: '10px', color: '#1C91FB', cursor: 'pointer' }} />
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
                onChange={(e) => { setDetailAddress(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">이메일</Typography>
              <TextField
                className={classes.input}
                style={{ float: 'left', width: '30%', backgroundColor: '#FFFFFF' }}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="emailId"
                name="emailId"
                autoComplete="emai"
                value={emailId}
                onChange={(e) => { setEmailId(e.target.value) }}
              />
              <Typography className={classes.font} style={{ float: 'left', width: '5%', padding: '5px', paddingTop: '10PX', textAlign: 'center', backgroundColor: 'white' }} variant="body1">@</Typography>
              <FormControl variant="outlined" style={{ float: 'left', width: '30%', backgroundColor: '#FFFFFF', padding: '5px' }}>
                <Select
                  style={{ height: '2.5em' }}
                  labelId="demo-simple-select-outlined-label"
                  id="email"
                  size="small"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                >
                  <MenuItem value={'gmail.com'}>gmail.com</MenuItem>
                  <MenuItem value={'naver.com'}>naver.com</MenuItem>
                  <MenuItem value={'daum.net'}>daum.net</MenuItem>
                  <MenuItem value={'yahoo.co.kr'}>yahoo.co.kr</MenuItem>
                  <MenuItem value={'hotmail.com'}>hotmail.com</MenuItem>
                  <MenuItem value={'nate.com'}>nate.com</MenuItem>
                  <MenuItem value={'empas.com'}>empas.com</MenuItem>
                  <MenuItem value={'hotmail.com'}>hotmail.com</MenuItem>
                  <MenuItem value={'weppy.com'}>weppy.com</MenuItem>
                  <MenuItem value={'korea.com'}>korea.com</MenuItem>
                  <MenuItem value={'mail.co.kr'}>hotmail.com</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">보험 여부</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="insurance" name="insurance" value={insurance} onChange={(e) => { setInsurance(e.target.value) }} >
                  <FormControlLabel
                    value="Y"
                    control={<Radio color="primary" />}
                    label="있음"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio color="primary" />}
                    label="없음"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">진료 구분</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="diagnosis" name="diagnosis" value={diagType} onChange={(e) => { setDiagType(e.target.value) }} >
                  <FormControlLabel
                    value="초진"
                    control={<Radio color="primary" />}
                    label="초진"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="재진"
                    control={<Radio color="primary" />}
                    label="재진"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">내원일</Typography>
              <TextField
                className={classes.input}
                id="visitDate"
                type="date"
                variant="outlined"
                size="small"
                value={visitDate}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">비고</Typography>
              <TextField
                className={classes.input}
                multiline
                rows={4}
                variant="outlined"
                value={remark}
                onChange={(e) => { setRemark(e.target.value) }}
              />
            </Grid>

          </Grid>

          <Button
            style={{ margin: '5px', backgroundColor: '#1C91FB', border: '1px solid #1C91FB', float: 'right' }}
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            onClick={create}
            disableElevation>
            등록
          </Button>
          <Button
            style={{ margin: '5px', backgroundColor: '#1C91FB', border: '1px solid #1C91FB', float: 'right' }}
            variant="contained"
            color="primary"
            size="small"
            type="button"
            onClick={onReset}
            disableElevation>
            취소
          </Button>
        </form>
      </div>
    </Container>
  );
}