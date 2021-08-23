import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import patientService from '../service/patientService';
import SiteLayout from '../layout/SiteLayout';
import SearchBar from "material-ui-search-bar";
import Row from './Row';
import PatientPage from './PatientPage';

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
 const [search, setSearch] = useState('');

 const searchableKeys = ['name', 'ssn', 'gender', 'telNo', 'address'];

 const filteredPatients = patient.filter((item) =>
 searchableKeys.some((key) =>
   item[key].toLowerCase().includes(search.toLowerCase())
 )
);

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
      <SearchBar
      value={search}
      onChange={(value) => setSearch(value)}
      onCancelSearch={() => setSearch('')}
      style={{
        margin: '0 0 10px auto',
        maxWidth: 800,
      }}
    />
  <TableContainer component={Paper}>
  <Table className={classes.table} aria-label="collapsible table">
    <TableHead>
      <TableRow>
        <TableCell style={{width: '6%'}}/>
        <TableCell style={{width: '8%', textAlign: 'center'}}>환자 번호</TableCell>
        <TableCell style={{width: '12%', textAlign: 'center'}}>이름</TableCell>
        <TableCell style={{width: '12%', textAlign: 'center'}}>성별/나이</TableCell>
        <TableCell style={{width: '12%', textAlign: 'center'}}>주민등록번호</TableCell>
        <TableCell style={{width: '20%', textAlign: 'center'}}>전화번호</TableCell>
        <TableCell style={{width: '30%'}}>주소</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {(rowsPerPage > 0
            ? filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredPatients
            ).map((patientList) => (
        <Row key={patientList.patientNo} row={patientList}/>
      ))}
                {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
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
              ActionsComponent={PatientPage}
            />
          </TableRow>
        </TableFooter>
  </Table>
</TableContainer>
</SiteLayout>

 
 );
}
