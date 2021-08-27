import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SiteLayout from '../../layout/SiteLayout';
import receiptService from '../../service/receiptService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    marginTop: theme.spacing(3),
  },
  font: {
    width: '35%',
    float: 'left',
    padding: '6px 0 7px',
    textAlign: 'right'
  },
  input: {
    width: '50%',
    float: 'left',
    fontSize: '20px',
    backgroundColor: '#FFFFFF',
    marginLeft: '40px'
  },
  textField: {
    display: 'inline-block',
    float: 'right'
  }
}));

export default function Receipt(props) {
  const classes = useStyles();
  const [bp, setBP] = useState('');
  const [bs, setBS] = useState('');
  const [remark, setRemark] = useState('');
  
  const create = (e) => {
    e.preventDefault();

  let receipt = {
    remark: remark,
    bp: bp,
    bs: bs,
    patientNo: props.location.state.patientNo,
    userId: window.sessionStorage.getItem('user')
  }

  receiptService.create(receipt)
  .then( res => {
    console.log(receipt.patientNo + '님이 성공적으로 접수되었습니다.');
  })
  .catch( err => {
    console.log('create() 에러', err);
  });
};

  return (
    <SiteLayout>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid item xs={6} container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12}>
              <Typography className={classes.font} variant="body1" gutterBottom>환자번호</Typography>
              <TextField
                className={classes.input}
                fullWidth
                id="filled-read-only-input1"
                defaultValue={props.location.state.patientNo}
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.font} variant="body1" gutterBottom>이름</Typography>
              <TextField
                className={classes.input}
                fullWidth
                id="filled-read-only-input2"
                defaultValue={props.location.state.name}
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.font} variant="body1" gutterBottom>보험 여부</Typography>
              <TextField
                className={classes.input}
                fullWidth
                id="filled-read-only-input1"
                defaultValue={props.location.state.insurance}
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.font} variant="body1" gutterBottom>혈압</Typography>
              <TextField
                className={classes.input}
                fullWidth
                id="filled-read-only-input3"
                value={ bp }
                onChange={ (e) => { setBP(e.target.value) }}
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.font} variant="body1" gutterBottom>혈당</Typography>
              <TextField
                className={classes.input}
                fullWidth
                id="filled-read-only-input4"
                value={ bs }
                onChange={ (e) => { setBS(e.target.value) }}
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{width: '69%', marginLeft: '140px'}}>
              <TextField
              className={classes.textField}
                style={{ backgroundColor: '#FFFFFF'}}
                multiline
                fullWidth
                label="접수 메모"
                rows={4}
                value={ remark }
                onChange={ (e) => { setRemark(e.target.value) }}
                variant="outlined"
              />
              </div>
            </Grid>
            <Button style={{marginTop: '10px'}} variant="outlined" size="small" color="primary" type="submit" onClick={ create }>접수</Button>
          </Grid>
        </form>
      </div>
    </SiteLayout>
  );
}