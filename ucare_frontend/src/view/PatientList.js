import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import patientService from '../service/patientService';
import receiptService from '../service/receiptService';
import SiteLayout from '../layout/SiteLayout';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const useStyles1 = makeStyles((theme) => ({
  useStyle1: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.useStyle1}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useRowStyles = makeStyles({
  rowStyle: {
    '& > *': {
      borderBottom: 'unset',
    },
  }
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [receipt, setReceipt] = useState([]);
  
  const fetchReceipt =  () => {
   receiptService.retrieveAll()
   .then( res => {
     setReceipt(res.data.data);
   })
   .catch( err => {
     console.log('retrieveAll() 에러', err);
   });
 };
 
  useEffect(() => {
    fetchReceipt();
  }, []);
  
  return (

    <React.Fragment>
      <TableRow className={classes.rowStyle}>
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
                    <TableCell>No</TableCell>
                    <TableCell>접수 번호</TableCell>
                    <TableCell>접수 날짜</TableCell>
                    <TableCell>접수 시간</TableCell>
                    <TableCell>접수 메모</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipt&&receipt.map((receiptList) => (
                      row.patientNo === receiptList.patientNo ? 
                    <TableRow key={receiptList.receiptNo}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell>{receiptList.receiptNo}</TableCell>
                      <TableCell>{receiptList.receiptDt}</TableCell>
                      <TableCell>{receiptList.receiptTime}</TableCell>
                      <TableCell>{receiptList.remark}</TableCell>
                    </TableRow>
                      : null
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


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function PatientList() {
 const classes = useStyles2();
 const [patient, setPatient] = useState([]);
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);

 const emptyRows = rowsPerPage - Math.min(rowsPerPage, patient.length - page * rowsPerPage);

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };

 const fetchPatient =  () => {
  patientService.retrieveAll()
  .then( res => {
    setPatient(res.data.data);
  })
  .catch( err => {
    console.log('retrieveAll() 에러', err);
  });
};


 useEffect(() => {
  fetchPatient();
 }, []);

 return (
  <SiteLayout>
  <TableContainer component={Paper}>
  <Table className={classes.table} aria-label="collapsible table">
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>환자 번호</TableCell>
        <TableCell>이름</TableCell>
        <TableCell>성별/나이</TableCell>
        <TableCell>주민등록번호</TableCell>
        <TableCell>전화번호</TableCell>
        <TableCell>주소</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {(rowsPerPage > 0
            ? patient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : patient
            ).map((patientList) => (
        <Row key={patientList.patientNo} row={patientList} />
      ))}
                {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
    </TableBody>
    <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={8}
              count={patient.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
  </Table>
</TableContainer>
</SiteLayout>

 
 );
}


{/* <ul>
{patient&&patient.map(user => (
  <li key={user.patientNo}>
    {user.name}
  </li>
))}
</ul> */}