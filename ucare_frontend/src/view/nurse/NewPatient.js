import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Button as Buttons } from 'primereact/button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import patientService from '../../service/patientService';
import DaumPostcode from "react-daum-postcode";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';
import { Toast } from 'primereact/toast';

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
    color: 'black'
  }
}));

export default function NewPatient() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [ssn, setSSN] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('???');
  const [telNo, setTelNo] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('Y');
  const [diagType, setDiagType] = useState('??????');
  const [visitDate, setVisitDate] = useState('');
  const [remark, setRemark] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [checkSSN, setCheckSSN] = useState(true);
  const [reload, setReload] = useRecoilState(reloadState);
  const toast = useRef(null);

  useEffect(() => {
    const newDate = new Date();
    const date = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    setVisitDate(`${year}-${month}-${date}`);

    const getGender = ssn.substr(7, 1)

    if (getGender % 2 == 1) {
      setGender('???');
    } else {
      setGender('???');
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

  }, [ssn, gender, age]);

  useEffect(() => {
    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [telNo]);

  const nameRegex = /^[???-???a-zA-Z]+$/;
  const nameValidError = () =>
    name != '' ? (nameRegex.test(name) ? false : true) : false;

  const telNoRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const telNoValidError = () =>
    telNo != '' ? (telNoRegex.test(telNo) ? false : true) : false;

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  };

  const ssnValidError = () => {
    var jnumArr = new Array(); // ?????? ??? ??????????????? ???????????? ?????? ??????
    var jnumplus = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 1]; // ???????????? ???????????? ????????? ??????
    var jnumSum = 0; //objNum[i] * jnumplus[i] ?????? ???

    if (ssn != '') { // ?????????????????? ????????? ???????????? ?????? 
      for (var i = 0; i < ssn.length; i++) { // ???????????? ???????????? jnumArr????????? ??????
        jnumArr[i] = ssn.charAt(i);
      }

      for (var i = 0; i < ssn.length - 1; i++) { // ???????????? ???????????? jnumArr????????? ??????
        jnumSum += jnumArr[i] * jnumplus[i];
      }
      jnumSum = (11 - (jnumSum % 11)) % 10; //???????????? ??????

      if (jnumSum != jnumArr[12]) { // ???????????? ?????? ?????????(jnumSum)??? ????????? ??????????????? ???????????? ?????? ????????? 
        if (checkSSN)
          return true;
      } else if (ssn.length === 13) {
        setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
        setCheckSSN(false);
      }
    }
    //????????? ???????????? ???????????? ???????????? ????????????
    return false;
  };

  const ssnChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setSSN(e.target.value);
      if (ssn.length < 15) {
        if (checkSSN == false) {
          setSSN(ssn.substring(0, 6) + ssn.substring(7, 13));
        }
        setCheckSSN(true)
      }
    }
  };

  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const hasNotValidError = () =>
    email != '' ? (regex.test(email) ? false : true) : false;


  const onReset = () => {
    setName('');
    setSSN('');
    setAge('');
    setGender('');
    setTelNo('');
    setAddress('');
    setDetailAddress('');
    setEmail('');
    setInsurance('Y');
    setRemark('');
  };

  const create = (e) => {
    e.preventDefault();

    if (name == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '????????? ??????????????????.', life: 3000 });
      return;
    } else if (ssn == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '????????????????????? ??????????????????.', life: 3000 });
      return;
    } else if (telNo == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '???????????? ??????????????????.', life: 3000 });
      return;
    };

    let data = {
      ssn: ssn
    };

    let patient = {
      name: name,
      ssn: ssn,
      age: age,
      gender: gender,
      telNo: telNo,
      address: address,
      detailAddress: detailAddress,
      email: email,
      insurance: insurance,
      diagnosis: diagType,
      visitDate: visitDate,
      remark: remark,
      userId: window.sessionStorage.getItem('user')
    }

    patientService.ssnOverlap(data)
      .then(res => {
        if (res.data != 1) {
          patientService.create(patient)
            .then(res => {
              console.log(patient.name + '?????? ????????? ??????????????? ?????????????????????.');
              setCheckSSN(true);
              toast.current.show({ severity: 'success', summary: '??????', detail: `${patient.name}?????? ?????????????????????.`, life: 3000 });
              setReload(!reload);
              onReset();
            })
            .catch(err => {
              console.log('create() ??????', err);
            });
        } else {
          toast.current.show({ severity: 'error', summary: '??????', detail: '????????????????????? ?????? ??????????????????.', life: 3000 });
        }
      })
      .catch(err => {
        console.log('check() ??????', err);
      });

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
    setAddress(fullAddress);
    closePostCode();
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Toast ref={toast} position="top-center" />
        <Typography variant="h6" className={classes.title}>?????? ??????</Typography>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
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
                error={nameValidError()}
                helperText={
                  nameValidError() ? "????????????, ??????, ??????????????? ???????????? ????????????." : null
                }
              />
            </Grid>
            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">??????????????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
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
                error={ssnValidError()}
                helperText={
                  ssnValidError() ? "????????????????????? ???????????? ????????????." : null
                }
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">??????</Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={(e) => { setGender(e.target.value) }} >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                    value="???"
                  />
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                    value="???"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">?????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
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
                error={telNoValidError()}
                helperText={
                  telNoValidError() ? "????????? ????????? ????????? ?????????." : null
                }
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
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
                <DialogTitle id="form-dialog-title">?????? ??????</DialogTitle>
                <DialogContent>
                  <DaumPostcode
                    onComplete={handlePostCode}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closePostCode} color="primary">??????</Button>
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
              <Typography className={classes.font} variant="body1">?????????</Typography>
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
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                error={hasNotValidError()}
                helperText={
                  hasNotValidError() ? "????????? ????????? ?????? ??????????????????." : null
                }
              />
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">?????? ??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="insurance" name="insurance" value={insurance} onChange={(e) => { setInsurance(e.target.value) }} >
                  <FormControlLabel
                    value="Y"
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">?????? ??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
              <FormControl component="fieldset" className={classes.radio}>
                <RadioGroup row aria-label="diagnosis" name="diagnosis" value={diagType} onChange={(e) => { setDiagType(e.target.value) }} >
                  <FormControlLabel
                    value="??????"
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="??????"
                    control={<Radio color="primary" />}
                    label="??????"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ border: '1px solid #D6D6D6' }}>
              <Typography className={classes.font} variant="body1">?????????</Typography>
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
              <Typography className={classes.font} variant="body1">??????</Typography>
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
          <div style={{ display: 'block', textAlign: 'center' }}>
            <Buttons
              style={{ width: '30%', margin: '10px', color: '#1C91FB' }}
              label="??????"
              className="p-button-outlined"
              type="submit"
              onClick={onReset} />
            <Buttons
              style={{ width: '30%', margin: '11px', backgroundColor: '#1C91FB', color: 'white' }}
              label="??????"
              className="p-button-outlined"
              type="submit"
              onClick={create} />
          </div>
        </form>
      </div>
    </Container>
  );
}