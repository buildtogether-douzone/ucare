import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import patientService from '../../service/patientService';
import SearchBar from "material-ui-search-bar";
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Row from './Row';
import PatientPage from './PatientPage';
import NewPatient from './NewPatient';
import { Toast } from 'primereact/toast';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';

const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function PatientList() {
  const classes = useStyles2();
  const [patient, setPatient] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [search, setSearch] = useState('');
  const [searchBar, setSearchBar] = useState(false);

  const [reload, setReload] = useRecoilState(reloadState);

  const toast = useRef(null);

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

  const fetchPatient = () => {
    patientService.retrieveAll()
      .then(res => {
        setPatient(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() ??????', err);
      });
  };

  useEffect(() => {
    fetchPatient();
  }, [reload]);

  return (
    <Grid container>
      <Toast ref={toast} />
      <Grid item xs={5}>
        <NewPatient />
      </Grid>
      <Grid item xs={7}>
        <div className={classes.paper}>
          {searchBar ?
            <SearchBar
              value={search}
              onChange={(value) => setSearch(value)}
              onCancelSearch={() => setSearch('')}
              style={{
                margin: '0 0 10px auto',
                maxWidth: 800,
              }}
            /> : null}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#DFDFDF' }}>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '5px' }} onClick={() => setSearchBar(!searchBar)}><SearchIcon  style={{ marginTop: '5px', fontSize: '25px', color: '#1C91FB', cursor: 'pointer' }} /></TableCell>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '10px' }}>????????????</TableCell>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '10px' }}>??????</TableCell>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '10px' }}>??????/??????</TableCell>
                  <TableCell style={{ width: '20%', textAlign: 'center', padding: '10px' }}>??????????????????</TableCell>
                  <TableCell style={{ width: '20%', textAlign: 'center', padding: '10px' }}>????????????</TableCell>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '10px' }}>????????????</TableCell>
                  <TableCell style={{ width: '10%', textAlign: 'center', padding: '10px' }}>??????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredPatients
                ).map((patientList) => (
                  <Row ref={toast} key={patientList.patientNo} row={patientList} />
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
                    rowsPerPageOptions={[5, 10, 12, 15, 25, { label: 'All', value: -1 }]}
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
        </div>
      </Grid>
    </Grid>
  );
}