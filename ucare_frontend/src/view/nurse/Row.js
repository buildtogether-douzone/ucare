import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';
import SockJsClient from 'react-stomp';

import patientService from '../../service/patientService';
import receiptService from '../../service/receiptService';
import timeService from '../../service/timeService';
import DaumPostcode from "react-daum-postcode";

const useRowStyles = makeStyles((theme) => ({
  rowStyle: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },

  mouse: {
    '&:hover': {
      textDecoration: "underline",
      textUnderlinePosition: "under"
    },
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px'
  },
  mouseRemark: {
    '&:hover': {
      textDecoration: "underline",
      textUnderlinePosition: "under"
    },
    cursor: 'pointer',
    padding: '10px'
  },


}));


const Row = React.forwardRef((props, ref) => {
  const classes = useRowStyles();
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalBP, setModalBP] = useState('');
  const [modalBS, setModalBS] = useState('');
  const [modalRemark, setModalRemark] = useState('');
  const [deleteNo, setDeleteNo] = useState('');
  const [patientNo, setPatientNo] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [ssn, setSSN] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [telNo, setTelNo] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [insurance, setInsurance] = useState('');
  const [insDt, setInsDt] = useState('');
  const [remark, setRemark] = useState('');
  const [bp, setBP] = useState('');
  const [bs, setBS] = useState('');
  const [receiptRemark, setReceiptRemark] = useState('');
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen3, setDialogOpen3] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [reload, setReload] = useRecoilState(reloadState);

  const $websocket = useRef(null);

  // yyyy-MM-dd ???????????? ??????
  const dateFormat = (date) => {
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month ???????????? ??????
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day ???????????? ??????
    return year + '-' + month + '-' + day;
  };

  const handleClickOpen = (bp, bs, remark) => {
    setModalBP(bp);
    setModalBS(bs);
    setModalRemark(remark);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const patientInfoClickOpen = (patientNo, name, gender, email, ssn, age, address, detailAddress, telNo, diagnosis, insurance, insDt, remark) => {
    setPatientNo(patientNo);
    setName(name);
    setGender(gender);
    setEmail(email);
    setSSN(ssn);
    setAge(age);
    setAddress(address);
    setDetailAddress(detailAddress);
    setTelNo(telNo);
    setDiagnosis(diagnosis);
    setInsurance(insurance)
    setInsDt(insDt);
    setRemark(remark);
    setDialogOpen2(true);

  };

  const handleClose2 = () => {
    document.body.style.position = "";
    setDialogOpen2(false);

  };

  const receiptClickOpen = (patientNo, name, insurance) => {
    setPatientNo(patientNo);
    setName(name);
    setInsurance(insurance)
    setDialogOpen3(true);
  };

  const handleClose3 = () => {
    setDialogOpen3(false);
  };

  useEffect(() => {
    const newDate = new Date();
    const date = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();

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

    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (ssn.length === 13) {
      setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
    }

  }, [ssn, telNo, gender, age]);

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  };

  const nameRegex = /^[???-???a-zA-Z]+$/;
  const nameValidError = () =>
    name != '' ? (nameRegex.test(name) ? false : true) : false;


  const regex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  const hasNotValidError = emailEntered =>
    regex.test(email) ? false : true;

  const fetchReceipt = () => {
    receiptService.retrieveAll(row.patientNo)
      .then(res => {
        setReceipt(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() ??????', err);
      });
  };

  const deleteReceipt = (receiptNo) => {
    setDeleteNo(receiptNo);
    receiptService.delete(receiptNo)
      .then(res => {
        console.log(receiptNo + '??? ????????? ??????????????? ?????????????????????.');
        ref.current.show({ severity: 'success', summary: '??????', detail: '????????? ?????????????????????.', life: 3000 });
        $websocket.current.sendMessage('/Nurse');
        setReload(!reload);
      })
      .catch(err => {
        console.log('delete() ??????', err);
      });
  };

  useEffect(() => {
    fetchReceipt();
  }, [reload]);

  const update = (e) => {
    e.preventDefault();

    if (name == '') {
      ref.current.show({ severity: 'error', summary: '??????', detail: '????????? ??????????????????.', life: 3000 });
      return;
    } else if (telNo == '') {
      toast.current.show({ severity: 'error', summary: '??????', detail: '???????????? ??????????????????.', life: 3000 });
      return;
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
      remark: remark,
      patientNo: row.patientNo,
      uptNo: sessionStorage.getItem('user_no')
    }

    patientService.update(patient)
      .then(res => {
        console.log(patient.name + '?????? ????????? ??????????????? ?????????????????????.');
        ref.current.show({ severity: 'success', summary: '??????', detail: `${patient.name}?????? ????????? ?????????????????????.`, life: 3000 });
      })
      .catch(err => {
        console.log('updatePatient() ??????', err);
      });

    setDialogOpen2(false);
  };

  const create = (e) => {
    e.preventDefault();

    let receipt = {
      remark: receiptRemark,
      bp: bp,
      bs: bs,
      patientNo: row.patientNo,
      name: row.name,
      userId: sessionStorage.getItem('user')
    }

    timeService.retrieveAll(dateFormat(date)).then(res => {
      if (res.data.length !== 0) {
        receiptService.create(receipt)
          .then(res => {
            if (res.data != 0) {
              console.log(receipt.patientNo + '?????? ??????????????? ?????????????????????.');
              ref.current.show({ severity: 'success', summary: '??????', detail: `${receipt.name}?????? ?????????????????????.`, life: 3000 });
              timeService.update(dateFormat(date)).then(res => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
                $websocket.current.sendMessage('/Doctor');
                $websocket.current.sendMessage('/Reservation');
                setReload(!reload);
              })
                .catch(err => {
                  console.log('update() ??????', err);
                });
            }
            else
              ref.current.show({ severity: 'error', summary: '??????', detail: '?????? ?????? ?????? ????????? ???????????????.', life: 3000 });
          })
          .catch(err => {
            console.log('create() ??????', err);
          });
      }
      else {
        ref.current.show({ severity: 'error', summary: '??????', detail: '??????????????? ????????? ????????????.', life: 3000 });
      }
    })
      .catch(err => {
        console.log('retrieveAll() ??????', err);
      });

    setDialogOpen3(false);
    setBP('');
    setBS('');
    setReceiptRemark('');
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


  const onReset = () => {
    setBP('');
    setBS('');
    setReceiptRemark('');
    handleClose3();
  };

  return (
    <React.Fragment>
      <SockJsClient
        url="http://localhost:8080/ucare_backend/start"
        topics={['/topics/nurse']}
        onMessage={msg => { null }}
        ref={$websocket} />
      <TableRow className={classes.rowStyle}>
        <TableCell style={{ textAlign: 'center', padding: '10px' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ textAlign: 'center', padding: '10px' }}>
          {row.patientNo}
        </TableCell>
        <TableCell style={{ textAlign: 'center', padding: '10px' }}>{row.name}</TableCell>
        <TableCell style={{ textAlign: 'center', padding: '10px' }}>{row.ageGender}</TableCell>
        <TableCell style={{ textAlign: 'center', padding: '10px' }}>{row.ssn}</TableCell>
        <TableCell style={{ textAlign: 'center', padding: '10px' }}>{row.telNo}</TableCell>
        <TableCell style={{ textAlign: 'center', padding: '5px' }}>
          <PermIdentityIcon
            onClick={() => {
              document.body.style.position = "relative";
              patientInfoClickOpen(
                row.patientNo,
                row.name,
                row.gender,
                row.email,
                row.ssn,
                row.age,
                row.address,
                row.detailAddress,
                row.telNo,
                row.diagnosis,
                row.insurance,
                row.insDt,
                row.remark)
            }}
            style={{ color: '#1C91FB', fontSize: '30px', cursor: 'pointer' }} /></TableCell>
        <Dialog open={dialogOpen2} onClose={handleClose2} aria-labelledby="form-dialog-title" fullWidth maxWidth={'sm'}>
          <DialogTitle id="form-dialog-title">?????? ??????</DialogTitle>
          <DialogContent>
            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <TextField
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
            <Typography className={classes.font} variant="body1" gutterBottom>??????????????????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-ssn"
              name="ssn"
              autoComplete="ssn"
              defaultValue={ssn}
              InputProps={{
                readOnly: true,
              }}
            />

            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <FormControl component="fieldset">
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

            <Typography className={classes.font} variant="body1" gutterBottom>????????????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-telNo"
              name="telNo"
              value={telNo}
              onChange={telNoChange}
            />
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
              <TextField
                style={{ width: '85%', float: 'left' }}
                variant="outlined"
                required
                fullWidth
                size="small"
                id="outlined-address"
                name="address"
                autoComplete="address"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
              />
              <SearchIcon onClick={openPostCode} style={{ float: 'left', marginLeft: '10px', fontSize: '40px', color: '#1C91FB', cursor: 'pointer' }} />
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
                style={{ backgroundColor: '#FFFFFF', marginTop: '10px' }}
                variant="outlined"
                fullWidth
                size="small"
                id="detailAddress"
                name="detailAddress"
                value={detailAddress}
                onChange={(e) => { setDetailAddress(e.target.value) }}
              />
            </div>
            <Typography className={classes.font} variant="body1" gutterBottom>?????????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="email"
              name="email"
              autoComplete="email"
              error={hasNotValidError('email')}
              helperText={
                hasNotValidError('email') ? "????????? ????????? ?????? ??????????????????." : null
              }
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>?????? ??????</Typography>
            <FormControl component="fieldset">
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

            <Typography className={classes.font} variant="body1" gutterBottom>?????? ??????</Typography>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="diagnosis" name="diagnosis" value={diagnosis} >
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

            <Typography className={classes.font} variant="body1" gutterBottom>?????? ?????????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-insDt"
              name="insDt"
              defaultValue={insDt}
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              variant="outlined"
              rows={6}
              value={remark}
              onChange={(e) => { setRemark(e.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">??????</Button>
            <Button onClick={update} color="primary">??????</Button>
          </DialogActions>
        </Dialog>

        <TableCell style={{ textAlign: 'center', padding: '5px' }}>
          <AddBoxIcon
            onClick={() => {
              receiptClickOpen(
                row.patientNo,
                row.name,
                row.insurance)
            }}
            style={{ color: '#1C91FB', fontSize: '30px', cursor: 'pointer' }} /></TableCell>
        <Dialog open={dialogOpen3} onClose={handleClose3} aria-labelledby="form-dialog-title" fullWidth maxWidth={'sm'}>

          <DialogTitle id="form-dialog-title">??????</DialogTitle>
          <DialogContent>
            <Typography className={classes.font} variant="body1" gutterBottom>????????????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-patientNo"
              name="patientNo"
              autoComplete="patientNo"
              defaultValue={patientNo}
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-name1"
              name="name1"
              autoComplete="name1"
              defaultValue={name}
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>?????? ??????</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              id="outlined-insurance"
              name="insurance"
              autoComplete="insurance"
              defaultValue={insurance}
              InputProps={{
                readOnly: true,
              }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="bp"
              id="filled-read-only-bp"
              value={bp}
              label="????????? ???????????????."
              onChange={(e) => { setBP(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="bs"
              id="filled-read-only-bs"
              value={bs}
              label="????????? ???????????????."
              onChange={(e) => { setBS(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>?????? ??????</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              variant="outlined"
              rows={6}
              label="?????? ????????? ???????????????."
              value={receiptRemark}
              onChange={(e) => { setReceiptRemark(e.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onReset} color="primary">??????</Button>
            <Button onClick={create} color="primary">??????</Button>
          </DialogActions>
        </Dialog>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: '#DFDFDF' }}>
                    <TableCell style={{ width: '3%' }} />
                    <TableCell style={{ width: '6%', textAlign: 'center', padding: '10px' }}>No</TableCell>
                    <TableCell style={{ width: '12%', textAlign: 'center', padding: '10px' }}>?????? ??????</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center', padding: '10px' }}>?????? ??????</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center', padding: '10px' }}>?????? ??????</TableCell>
                    <TableCell style={{ width: '35%', textAlign: 'center', padding: '10px' }}>?????? ??????</TableCell>
                    <TableCell style={{ width: '10%', textAlign: 'center', padding: '5px' }}>????????????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipt.map((receiptList) => (
                    <TableRow key={receiptList.receiptNo} >
                      <TableCell />
                      <TableCell
                        style={{ textAlign: 'center', padding: '10px' }} component="th" scope="row">{receiptList.no}</TableCell>
                      <TableCell onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }} className={classes.mouse}>
                        {receiptList.receiptNo}</TableCell>
                      <TableCell
                        onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }} className={classes.mouse}>
                        {receiptList.receiptDt}</TableCell>
                      <TableCell
                        onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }} className={classes.mouse}>
                        {receiptList.receiptTime}</TableCell>
                      <TableCell
                        onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }} className={classes.mouseRemark}>
                        {receiptList.remark}</TableCell>
                      {receiptList.state !== 'init' ?
                        <TableCell></TableCell>
                        : <TableCell
                          style={{ textAlign: 'center', padding: '5px' }}>
                          <ClearIcon onClick={() => { deleteReceipt(receiptList.receiptNo) }} style={{ color: '#1C91FB', fontSize: '30px', cursor: 'pointer' }} />
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                  <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'sm'}>
                    <DialogTitle id="form-dialog-title">?????? ??????</DialogTitle>
                    <DialogContent>
                      <Typography className={classes.font} variant="body1" gutterBottom>??????</Typography>
                      <TextField
                        fullWidth
                        id="filled-read-only-input1"
                        defaultValue={modalBP}
                        size="small"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Typography className={classes.font} variant="body1" gutterBottom style={{ marginTop: '12px' }}>??????</Typography>
                      <TextField
                        fullWidth
                        id="filled-read-only-input2"
                        defaultValue={modalBS}
                        size="small"
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Typography className={classes.font} variant="body1" gutterBottom style={{ marginTop: '12px' }}>?????? ??????</Typography>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        fullWidth
                        rows={6}
                        defaultValue={modalRemark}
                        variant="outlined"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">??????</Button>
                    </DialogActions>
                  </Dialog>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

  );
})

export default Row;