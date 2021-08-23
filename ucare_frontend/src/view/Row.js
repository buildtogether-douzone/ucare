import React, {useState, useEffect} from 'react';
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
    let count = 0;
    
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
        console.log(props.no);
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
                    {receipt.map((receiptList) => (
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
  