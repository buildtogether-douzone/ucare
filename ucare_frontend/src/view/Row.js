import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import receiptService from '../service/receiptService';
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
import { Link } from "react-router-dom";

const useRowStyles = makeStyles({
  rowStyle: {
    '& > *': {
      borderBottom: 'unset',
    },
  }
});

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [receipt, setReceipt] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalBP, setModalBP] = useState('');
  const [modalBS, setModalBS] = useState('');
  const [modalRemark, setModalRemark] = useState('');

  const handleClickOpen = (a, b, c) => {
    setModalBP(a);
    setModalBS(b);
    setModalRemark(c);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const fetchReceipt = () => {
    receiptService.retrieveAll(row.patientNo)
      .then(res => {
        setReceipt(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() 에러', err);
      });
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  return (

    <React.Fragment>
      <TableRow className={classes.rowStyle}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
          {row.patientNo}
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>{row.name}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{row.ageGender}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{row.ssn}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{row.telNo}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>
        <Link to={{
            pathname: `/patient/${row.patientNo}`,
            state: {
              patientNo: row.patientNo,
              name: row.name,
              gender: row.gender,
              emailId: row.emailId,
              email: row.email,
              ssn: row.ssn,
              age: row.age,
              address: row.address,
              telNo: row.telNo,
              diagnosis: row.diagnosis,
              insurance: row.insurance,
              insDt: row.insDt,
              remark: row.remark
            }
          }}><Button variant="outlined" size="small" color="primary">환자정보</Button></Link>
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>
        <Link to={{
            pathname: `/receipt/${row.patientNo}`,
            state: {
              patientNo: row.patientNo,
              name: row.name,
              ageGender: row.ageGender,
              insurance: row.insurance
            }
          }}><Button variant="outlined" size="small" color="primary">접수</Button></Link>
        </TableCell>
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
                  <TableRow>
                    <TableCell style={{ width: '3%' }} />
                    <TableCell style={{ width: '10%', textAlign: 'center' }}>No</TableCell>
                    <TableCell style={{ width: '12%', textAlign: 'center' }}>접수 번호</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center' }}>접수 날짜</TableCell>
                    <TableCell style={{ width: '17%', textAlign: 'center' }}>접수 시간</TableCell>
                    <TableCell style={{ width: '41%' }}>접수 메모</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipt.map((receiptList) => (
                    <TableRow key={receiptList.receiptNo} onClick={() => { handleClickOpen(receiptList.bp, receiptList.bs, receiptList.remark) }}>
                      <TableCell />
                      <TableCell style={{ textAlign: 'center' }} component="th" scope="row">{receiptList.no}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{receiptList.receiptNo}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{receiptList.receiptDt}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{receiptList.receiptTime}</TableCell>
                      <TableCell>{receiptList.remark}</TableCell>
                    </TableRow>
                  ))}
                  <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth={'sm'}>
                    <DialogTitle id="form-dialog-title">접수 내역</DialogTitle>
                    <DialogContent>
                      <Typography variant="body1" gutterBottom>혈압</Typography>
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
                      <Typography variant="body1" gutterBottom style={{ marginTop: '12px' }}>혈당</Typography>
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
                      <Typography variant="body1" gutterBottom style={{ marginTop: '12px' }}>접수 메모</Typography>
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
