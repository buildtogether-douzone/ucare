import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userService from '../../service/userService';
import SiteLayout from '../../layout/SiteLayout';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      },
    input: {
      width: '30%',
      fontSize: '16px',
      fontWeight: '600',
    }
  }));

export default function Reservation( ){
    const classes = useStyles();
    const [name, setName] = useState('');
    const [ssn, setSsn] = useState('');
    const [telNo, setTelNo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState(''); 

    useEffect(() => {
        const newDate = new Date()
        const date = ('0'+ newDate.getDate()).slice(-2);
        const month = ('0'+( newDate.getMonth() + 1)).slice(-2);
        const year = newDate.getFullYear();

        const hours = ('0' + newDate.getHours()).slice(-2);
        const minutes = ('0' + newDate.getMinutes()).slice(-2);

        setDate(`${year}-${month}-${date}`);
        setTime(`${hours}:${minutes}`);
    }, [])

    const reservation = (e) => {
        let user = {
            name: name,
            ssn: ssn,
            telNo: telNo,
            date: date,
            time: time
          }

        userService.reservation(user)
            .then( res => {
              console.log(user.name + '님이 성공적으로 등록되었습니다.');
          })
          .catch( err => {
            console.log('reservation() 에러', err);
        });
    }

    return(
        <SiteLayout >
        <div className={classes.root} >
            <div className={classes.input} >
                <p style={{marginTop:'10px', marginBottom:'8px', marginLeft:'10px'}}>이름</p>
                <TextField
                    variant="outlined"
                    style={{backgroundColor: '#F2F2F2'}}
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    value={ name }
                    onChange={ (e) => { setName(e.target.value) } }
                    autoFocus
                />
                <p style={{marginTop:'20px', marginBottom:'8px', marginLeft:'10px'}}>주민등록번호</p>
                <TextField
                    variant="outlined"
                    style={{backgroundColor: '#F2F2F2'}}
                    required
                    fullWidth
                    id="ssn"
                    label="주민등록번호"
                    name="ssn"
                    autoComplete="ssn"
                    value={ ssn }
                    onChange={ (e) => { setSsn(e.target.value) } }
                    autoFocus
                />

                <p style={{marginTop:'15px', marginBottom:'8px', marginLeft:'10px'}}>전화번호</p>
                <TextField
                    variant="outlined"
                    style={{backgroundColor: '#F2F2F2'}}
                    required
                    fullWidth
                    id="resTelNo"
                    label="전화번호"
                    name="resTelNo"
                    autoComplete="telNo"
                    value={ telNo }
                    onChange={ (e) => { setTelNo(e.target.value) } }
                    autoFocus
                />

                <p style={{marginTop:'15px', marginBottom:'8px', marginLeft:'10px'}}>날짜</p>
                <form noValidate>
                    <TextField
                        style={{width: '100%', marginLeft:'10px'}}
                        id="date"
                        type="date"
                        value={ date }
                        onChange={ (e) => { setDate(e.target.value) } }
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form>

                <p style={{marginTop:'15px', marginBottom:'8px', marginLeft:'10px'}}>예약 시간</p>
                <form noValidate>
                    <TextField
                        id="time"
                        type="time"
                        style={{width: '100%', marginLeft:'10px'}}
                        value={ time }
                        onChange={ (e) => { setTime(e.target.value) }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        sx={{ width: 150 }}
                    />
                </form>
                <Button 
                    href="/Home"
                    type="submit"
                    style={{width: '100%', marginTop: '20px'}} 
                    variant="contained" 
                    color="primary"
                    onClick={ reservation } 
                    disableElevation
                >
                    예약하기
                </Button>
            </div>
        </div>
        </SiteLayout>
    );
}