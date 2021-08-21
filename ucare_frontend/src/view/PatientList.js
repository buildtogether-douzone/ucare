import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import patientService from '../service/patientService';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.patientNo}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{row.ssn}</TableCell>
        <TableCell>{row.telNo}</TableCell>
        <TableCell>{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history&&row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PatientList() {
 const [patient, setPatient] = useState([]);
 
 const fetchPatient =  () => {
  patientService.retrieveAll()
  .then( res => {
    console.log(res.data.data);
    setPatient(res.data.data);
  })
  .catch( err => {
    console.log('updateUser() 에러', err);
  });
};


 useEffect(() => {
  fetchPatient();
 }, []);

 return (
  <TableContainer component={Paper}>
  <Table aria-label="collapsible table">
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>No</TableCell>
        <TableCell>이름</TableCell>
        <TableCell>성별/나이</TableCell>
        <TableCell>주민등록번호</TableCell>
        <TableCell>전화번호</TableCell>
        <TableCell>주소</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {patient&&patient.map((row) => (
        <Row key={row.patientNo} row={row} />
      ))}
    </TableBody>
  </Table>
</TableContainer>

 
 );
}


{/* <ul>
{patient&&patient.map(user => (
  <li key={user.patientNo}>
    {user.name}
  </li>
))}
</ul> */}