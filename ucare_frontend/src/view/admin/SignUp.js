import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Button as Buttons } from 'primereact/button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import userService from '../../service/userService';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Card } from 'primereact/card';
import SearchIcon from '@material-ui/icons/Search';
import DaumPostcode from "react-daum-postcode";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/adminAtom';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '50%',
    position: 'absoute',
    marginTop: '1.2rem'
  },
  font: {
    width: '25%',
    float: 'left',
    height: '100%',
    paddingTop: '12px',
    paddingLeft: '10px',
    backgroundColor: '#F4F4F4'
  },
  input: {
    width: '75%',
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
    width: '50%',
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
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [telNo, setTelNo] = useState('');
  const [role, setRole] = useState('??????');
  const [remark, setRemark] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [checkSSN, setCheckSSN] = useState(true);

  const [reload, setReload] = useRecoilState(reloadState);

  const options = ['??????', '?????????'];

  const toast = useRef(null);


  useEffect(() => {
    const getGender = ssn.substr(7, 1)

    if (getGender % 2 == 1) {
      setGender('male');
    } else {
      setGender('female');
    };

    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [ssn, gender, telNo]);

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


  const emailRegex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  const hasNotValidError = () =>
    email != '' ? (emailRegex.test(email) ? false : true) : false;

  const nameRegex = /^[???-???a-zA-Z]+$/;
  const nameValidError = () =>
    name != '' ? (nameRegex.test(name) ? false : true) : false;

  const nameChange = (e) => {
    setName(e.target.value)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const genderChange = (e) => {
    setGender(e.target.value)
  }

  const onReset = () => {
    setId('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setGender('female');
    setSSN('');
    setEmail('');
    setAddress('');
    setDetailAddress('');
    setTelNo('');
    setRole('??????');
    setRemark('');
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

  const addressChange = (e) => {
    setAddress(e.target.value)
  }

  const detailAddressChange = (e) => {
    setDetailAddress(e.target.value)
  }

  const telNoRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const telNoValidError = () =>
    telNo != '' ? (telNoRegex.test(telNo) ? false : true) : false;

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
    setAddress(fullAddress);
    closePostCode();
  }

  const saveUser = (e) => {
    e.preventDefault(); // ?????? ?????? ????????? ????????? ????????? ???????????? ?????? ?????? ?????????.

    if (name == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '????????? ??????????????????.', life: 3000 });
      return;
    } else if (password !== confirmPassword) {
      toast.current.show({ severity: 'error', summary: '??????', detail: '??????????????? ???????????? ????????? ????????? ?????????.', life: 3000 });
      return;
    } else if (ssn == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '????????????????????? ??????????????????.', life: 3000 });
      return;
    } else if (telNo == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '???????????? ??????????????????.', life: 3000 });
      return;
    };

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

    userService.fetchUserByID(user)
      .then(res => {
        if (res.data === '') {
          userService.fetchUserBySSN(user)
            .then(res => {
              if (res.data === '') {
                userService.addUser(user)
                  .then(res => {
                    console.log(user.name + '?????? ??????????????? ?????????????????????.');
                    onReset();
                    setReload(!reload);
                    toast.current.show({ severity: 'success', summary: '??????', detail: '?????? ?????????????????????.', life: 3000 });
                  })
                  .catch(err => {
                    console.log('saveUser() ??????', err);
                  });
              }
              else {
                toast.current.show({ severity: 'error', summary: '??????', detail: '????????????????????? ???????????????.', life: 3000 });
              }
            })
            .catch(err => {
              console.log('fetchUserBySSN() ??????', err);
            });
        }
        else {
          toast.current.show({ severity: 'error', summary: '??????', detail: '???????????? ???????????????.', life: 3000 });
        }
      })
      .catch(err => {
        console.log('fetchUserByID() ??????', err);
      });
  }

  return (
    <React.Fragment>
      <div className="p-grid" style={{ margin: '10px' }}>
        <div className="p-col-12">
          <div className="card p-fluid">
            <Card>
              <div className={classes.paper}>
                <span style={{ color: '#1C91FB', fontSize: '20px' }}>?????? ??????</span>
                <Divider />
                <Toast ref={toast} position="top-center" />
                <form className={classes.form} noValidate>
                  <Grid container>
                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">ID<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        size="small"
                        id="outlined-name"
                        name="id"
                        autoComplete="id"
                        value={id}
                        onChange={idChange}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">????????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        label="????????????(5??? ??????)"
                        size="small"
                        id="outlined-password"
                        name="password"
                        type="password"
                        error={hasError('password')} // ?????? ?????????????????? error ????????? ??????
                        autoComplete="current-password"
                        value={password}
                        onChange={passwordChange}
                      />
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">???????????? ??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        size="small"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        error={hasNotSameError('confirmPassword')} // ?????? ?????????????????? error ????????? ??????
                        helperText={
                          hasNotSameError('confirmPassword') ? "????????? ??????????????? ???????????? ????????????." : null
                        } // ????????? ???????????? ?????? ?????? ??????
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={confirmPasswordChange}
                      />
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
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
                        error={nameValidError()}
                        helperText={
                          nameValidError() ? "????????????, ??????, ??????????????? ???????????? ????????????." : null
                        }
                      />
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">??????????????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
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

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">??????</Typography>
                      <FormControl component="fieldset" className={classes.radio}>
                        <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={genderChange} >
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            label="??????"
                            labelPlacement="end"
                            value="female"
                          />
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            label="??????"
                            labelPlacement="end"
                            value="male"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">?????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
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

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
                        className={classes.input}
                        style={{ width: '68%' }}
                        variant="outlined"
                        required
                        size="small"
                        id="firstAddress"
                        name="firstAddress"
                        autoComplete="firstAddress"
                        value={address}
                        onChange={addressChange}
                      />
                      <SearchIcon onClick={openPostCode} style={{ fontSize: '33px', marginTop: '10px', cursor: 'pointer', color: '#1C91FB' }} />
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
                        variant="outlined"
                        size="small"
                        id="detailAddress"
                        name="detailAddress"
                        autoComplete="detailAddress"
                        value={detailAddress}
                        onChange={detailAddressChange}
                      />
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">?????????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        required
                        fullWidth
                        size="small"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={emailChange}
                        error={hasNotValidError()}
                        helperText={
                          hasNotValidError() ? "????????? ????????? ?????? ??????????????????." : null
                        }
                      />
                    </Grid>

                    <Grid item xs={12} style={{ borderTop: '1px solid #D6D6D6', borderBottom: '1px solid #D6D6D6' }}>
                      <Typography className={classes.font} variant="body1">??????<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                      <FormControl component="fieldset" className={classes.radio}>
                        <RadioGroup row aria-label="role" name="role" value={role} onChange={roleChange} >
                          <FormControlLabel
                            value="??????"
                            control={<Radio color="primary" />}
                            label="??????"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="?????????"
                            control={<Radio color="primary" />}
                            label="?????????"
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                  </Grid>
                  <div style={{ display: 'block', textAlign: 'center' }}>
                    <Buttons
                      style={{ backgroundColor: '#1C91FB', color: 'white', marginTop: '1.4rem', marginBottom: '1rem' }}
                      label="??????"
                      className="p-button-outlined"
                      type="submit"
                      onClick={saveUser} />
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}