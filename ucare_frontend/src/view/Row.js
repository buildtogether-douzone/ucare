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
    
    const fetchReceipt =  () => {
     receiptService.retrieveAll(row.patientNo)
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
          <TableCell >
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" onClick={ () => setModal01IsOpen(true) } style={{ textAlign: 'center'}}>
            {row.patientNo}
          </TableCell>
          <TableCell style={{ textAlign: 'center'}} onClick={ () => setModal01IsOpen(true) } >{row.name}</TableCell>
          <TableCell style={{ textAlign: 'center'}} onClick={ () => setModal01IsOpen(true) }>{row.gender}</TableCell>
          <TableCell style={{ textAlign: 'center'}} onClick={ () => setModal01IsOpen(true) }>{row.ssn}</TableCell>
          <TableCell style={{ textAlign: 'center'}} onClick={ () => setModal01IsOpen(true) }>{row.telNo}</TableCell>
          <TableCell onClick={ () => setModal01IsOpen(true) }>{row.address}</TableCell>
        </TableRow>
        <Modal
                isOpen={modal01IsOpen}
                onRequestClose={ () => setModal01IsOpen(false) }
                shouldCloseOnOverlayClick={ true }
                className={ styles.Modal }
                overlayClassName={ styles.Overlay }
                style={ {content: {width: 350}} }
                contentLabel="patient">
                <h1>비밀번호입력</h1>
                <div>

                        <label>작성시 입력했던 비밀번호를 입력하세요.</label>
                        <br/><br/>
                        <input type='text' />
                </div>
                <div className={ styles['modal-dialog-buttons'] }>
                    <button>확인</button>
                    <button onClick={ () => setModal01IsOpen(false) }>취소</button>
                </div>
            </Modal>

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
                      <TableCell style={{width: '10%', textAlign: 'center'}}>No</TableCell>
                      <TableCell style={{width: '12%', textAlign: 'center'}}>접수 번호</TableCell>
                      <TableCell style={{width: '20%', textAlign: 'center'}}>접수 날짜</TableCell>
                      <TableCell style={{width: '20%', textAlign: 'center'}}>접수 시간</TableCell>
                      <TableCell style={{width: '48%'}}>접수 메모</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {receipt.map((receiptList) => (
                      <TableRow key={receiptList.receiptNo} onClick={ () => setModal02IsOpen(true) }>
                        <TableCell style={{ textAlign: 'center'}} component="th" scope="row">{receiptList.no}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptNo}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptDt}</TableCell>
                        <TableCell style={{ textAlign: 'center'}}>{receiptList.receiptTime}</TableCell>
                        <TableCell>{receiptList.remark}</TableCell>
                      </TableRow>
                    ))}
                            <Modal
                isOpen={modal02IsOpen}
                onRequestClose={ () => setModal02IsOpen(false) }
                shouldCloseOnOverlayClick={ true }
                className={ styles.Modal }
                overlayClassName={ styles.Overlay }
                style={ {content: {width: 350}} }
                contentLabel="patient">
                <h1>비밀번호입력</h1>
                <div>

                        <label>작성시 입력했던 비밀번호를 입력하세요.</label>
                        <br/><br/>
                        <input type='text' />
                </div>
                <div className={ styles['modal-dialog-buttons'] }>
                    <button>확인</button>
                    <button onClick={ () => setModal02IsOpen(false) }>취소</button>
                </div>
            </Modal>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  
    );
  }
  