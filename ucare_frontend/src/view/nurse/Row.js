import React, { useState, useEffect } from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import patientService from '../../service/patientService';
import receiptService from '../../service/receiptService';
import timeService from '../../service/timeService';
import DaumPostcode from "react-daum-postcode";

const useRowStyles = makeStyles((theme) => ({
  rowStyle: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
}));


export default function Row(props) {
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
  const [emailId, setEmailId] = useState('');
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

  // yyyy-MM-dd 포맷으로 반환
  const dateFormat = (date) => {
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;
  }

  const handleClickOpen = (a, b, c) => {
    setModalBP(a);
    setModalBS(b);
    setModalRemark(c);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const patientInfoClickOpen = (a, b, c, d, e, f, g, h, i, j, k, l, m, n) => {
    setPatientNo(a);
    setName(b);
    setGender(c);
    setEmailId(d);
    setEmail(e);
    setSSN(f);
    setAge(g);
    setAddress(h);
    setDetailAddress(i);
    setTelNo(j);
    setDiagnosis(k);
    setInsurance(l)
    setInsDt(m);
    setRemark(n);
    setDialogOpen2(true);

  };

  const handleClose2 = () => {
    document.body.style.position = "";
    setDialogOpen2(false);

  };

  const receiptClickOpen = (a, b, c) => {
    setPatientNo(a);
    setName(b);
    setInsurance(c)
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
  }, [ssn, telNo, gender, age]);

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const fetchReceipt = () => {
    receiptService.retrieveAll(row.patientNo)
      .then(res => {
        setReceipt(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() 에러', err);
      });
  };

  const deleteReceipt = (receiptNo) => {
    setDeleteNo(receiptNo);
    receiptService.delete(receiptNo)
      .then(res => {
        console.log(receiptNo + '번 접수가 성공적으로 취소되었습니다.');
      })
      .catch(err => {
        console.log('delete() 에러', err);
      });
      alert('접수 취소 되었습니다.');
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const update = (e) => {
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
      remark: remark,
      patientNo: row.patientNo,
      uptNo: sessionStorage.getItem('user_no')
    }

    patientService.update(patient)
      .then(res => {
        console.log(patient.name + '님의 정보가 성공적으로 수정되었습니다.');
        window.location.reload();
      })
      .catch(err => {
        console.log('updatePatient() 에러', err);
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
      userId: sessionStorage.getItem('user')
    }

    receiptService.create(receipt)
      .then(res => {
        console.log(receipt.patientNo + '님이 성공적으로 접수되었습니다.');
        timeService.update(dateFormat(date)).then(res => {
          window.location.reload();
        })
        .catch(err => {
          console.log('update() 에러', err);
        });
      })
      .catch(err => {
        console.log('create() 에러', err);
      });

    setDialogOpen3(false);
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
  

  const onReset = () => {
    setBP('');
    setBS('');
    setReceiptRemark('');
    handleClose3();
  };

  return (
    <React.Fragment>
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
                        row.emailId,
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
          <DialogTitle id="form-dialog-title">환자 정보</DialogTitle>
          <DialogContent>
            <Typography className={classes.font} variant="body1" gutterBottom>이름</Typography>
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
            />
            <Typography className={classes.font} variant="body1" gutterBottom>주민등록번호</Typography>
            <TextField
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

            <Typography className={classes.font} variant="body1" gutterBottom>성별</Typography>
            <FormControl component="fieldset">
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

            <Typography className={classes.font} variant="body1" gutterBottom>전화번호</Typography>
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
              <Typography className={classes.font} variant="body1" gutterBottom>주소</Typography>
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
          style={{backgroundColor: '#FFFFFF', marginTop: '10px'}} 
          variant="outlined"
          fullWidth
          size="small"
          id="detailAddress"
          name="detailAddress"
          value={ detailAddress }
          onChange={(e) => { setDetailAddress(e.target.value) }}
        />
            </div>
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <Typography className={classes.font} variant="body1" gutterBottom>이메일</Typography>
              <TextField
                style={{ float: 'left', width: '45%', backgroundColor: '#FFFFFF' }}
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
              <Typography style={{ float: 'left', width: '10%', padding: '2%', textAlign: 'center', height: '2.5em' }} variant="body1">@</Typography>

              <FormControl variant="outlined" style={{ float: 'left', width: '45%' }}>
                <Select
                  style={{ height: '2.5em' }}
                  labelId="demo-simple-select-outlined-label"
                  id="email"
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
            </div>
            <Typography className={classes.font} variant="body1" gutterBottom>보험 여부</Typography>
            <FormControl component="fieldset">
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

            <Typography className={classes.font} variant="body1" gutterBottom>진료 구분</Typography>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="diagnosis" name="diagnosis" value={diagnosis} onChange={(e) => { setDiagnosis(e.target.value) }} >
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

            <Typography className={classes.font} variant="body1" gutterBottom>최초 내원일</Typography>
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
            <Typography className={classes.font} variant="body1" gutterBottom>비고</Typography>
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
            <Button onClick={handleClose2} color="primary">닫기</Button>
            <Button onClick={update} color="primary">수정</Button>
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

          <DialogTitle id="form-dialog-title">접수</DialogTitle>
          <DialogContent>
            <Typography className={classes.font} variant="body1" gutterBottom>환자번호</Typography>
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
            <Typography className={classes.font} variant="body1" gutterBottom>이름</Typography>
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
            <Typography className={classes.font} variant="body1" gutterBottom>보험 여부</Typography>
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
            <Typography className={classes.font} variant="body1" gutterBottom>혈압</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="bp"
              id="filled-read-only-bp"
              value={bp}
              onChange={(e) => { setBP(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>혈당</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="bs"
              id="filled-read-only-bs"
              value={bs}
              onChange={(e) => { setBS(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1" gutterBottom>접수 메모</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              variant="outlined"
              rows={6}
              value={receiptRemark}
              onChange={(e) => { setReceiptRemark(e.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onReset} color="primary">닫기</Button>
            <Button onClick={create} color="primary">접수</Button>
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
                  <TableRow style={{backgroundColor: '#DFDFDF'}}>
                    <TableCell style={{ width: '3%' }} />
                    <TableCell style={{ width: '6%', textAlign: 'center', padding: '10px' }}>No</TableCell>
                    <TableCell style={{ width: '12%', textAlign: 'center', padding: '10px' }}>접수 번호</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center', padding: '10px' }}>접수 날짜</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center', padding: '10px' }}>접수 시간</TableCell>
                    <TableCell style={{ width: '35%', textAlign: 'center', padding: '10px' }}>접수 메모</TableCell>
                    <TableCell style={{ width: '10%', textAlign: 'center', padding: '5px' }}>접수취소</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipt.map((receiptList) => (
                    <TableRow key={receiptList.receiptNo} >
                      <TableCell />
                      <TableCell 
                      onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }}
                      style={{ textAlign: 'center', padding: '10px' }} component="th" scope="row">{receiptList.no}</TableCell>
                      <TableCell onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }} 
                                style={{ textAlign: 'center', padding: '10px' }}>{receiptList.receiptNo}</TableCell>
                      <TableCell 
                      onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }}
                      style={{ textAlign: 'center', padding: '10px' }}>{receiptList.receiptDt}</TableCell>
                      <TableCell 
                      onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }}
                      style={{ textAlign: 'center', padding: '10px' }}>{receiptList.receiptTime}</TableCell>
                      <TableCell 
                      onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }}
                      style={{padding: '10px' }}>{receiptList.remark}</TableCell>
                      {receiptList.state == '완료' ?
                        <TableCell></TableCell>
                        : <TableCell
                            style={{ textAlign: 'center', padding: '5px' }}>
                              <ClearIcon onClick={() => { deleteReceipt(receiptList.receiptNo) }} style={{ color: '#1C91FB', fontSize: '30px', cursor: 'pointer' }}/>
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                  <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'sm'}>
                    <DialogTitle id="form-dialog-title">접수 내역</DialogTitle>
                    <DialogContent>
                      <Typography className={classes.font} variant="body1" gutterBottom>혈압</Typography>
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
                      <Typography className={classes.font} variant="body1" gutterBottom style={{ marginTop: '12px' }}>혈당</Typography>
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
                      <Typography className={classes.font} variant="body1" gutterBottom style={{ marginTop: '12px' }}>접수 메모</Typography>
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
                      <Button onClick={handleClose} color="primary">닫기</Button>
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
}
