import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "react-modal";
import ReactModal from "react-modal";
import styles from './modal.scss';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

ReactModal.setAppElement('body');


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
    const [modal01IsOpen, setModal01IsOpen] = useState(false);
    const [modal02IsOpen, setModal02IsOpen] = useState(false);
    const [DialogOpen, setDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
    };    
    const fetchReceipt =  () => {
     receiptService.retrieveAll(row.patientNo)
     .then( res => {
       setReceipt(res.data);
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
          <TableCell >
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" style={{ textAlign: 'center'}}>
            {row.patientNo}
          </TableCell>
          <TableCell style={{ textAlign: 'center'}}>{row.name}</TableCell>
          <TableCell style={{ textAlign: 'center'}}>{row.gender}</TableCell>
          <TableCell style={{ textAlign: 'center'}}>{row.ssn}</TableCell>
          <TableCell style={{ textAlign: 'center'}}>{row.telNo}</TableCell>
          <TableCell>{row.address}</TableCell>
          <TableCell style={{ textAlign: 'center'}}>        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          접수
        </Button></TableCell>
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
                      <TableCell style={{width: '3%'}}/>
                      <TableCell style={{width: '10%', textAlign: 'center'}}>No</TableCell>
                      <TableCell style={{width: '12%', textAlign: 'center'}}>접수 번호</TableCell>
                      <TableCell style={{width: '17%', textAlign: 'center'}}>접수 날짜</TableCell>
                      <TableCell style={{width: '17%', textAlign: 'center'}}>접수 시간</TableCell>
                      <TableCell style={{width: '41%'}}>접수 메모</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {receipt.map((receiptList) => (
                      <TableRow key={receiptList.receiptNo} onClick={ handleClickOpen }>
                        <TableCell />
                        <TableCell style={{ textAlign: 'center'}} component="th" scope="row">{receiptList.no}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptNo}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptDt}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptTime}</TableCell>
                        <TableCell>{receiptList.remark}</TableCell>
                      </TableRow>
                    ))}
      <Dialog open={DialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
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
  