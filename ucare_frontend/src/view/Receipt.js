import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SiteLayout from '../layout/SiteLayout';

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
    fontSize: '20px',
    textAlign: 'right'
  },
  input: {
    width: '50%',
    float:'left',  
    fontSize: '20px',
    marginLeft: '40px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '200',
    display: 'inline-block',
    float: 'right'
  }
}));


export default function NewPatient() {
    const classes = useStyles();
    const [value, setValue] = React.useState('top');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const [age, setAge] = React.useState('');

    const handleChangeEmail = (event) => {
      setAge(event.target.value);
    };

    

    return(
      <SiteLayout>
      <div className={classes.paper}>
      <form className={classes.form} noValidate>
          <Grid item xs={6} container spacing={1} style={{ display: 'flex',    justifyContent: 'center'}}> 
      <Grid item xs={12}>
      <TextField
        id="datetime-local"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>

      <Grid item xs={12}>
        <span className={classes.font}>차트번호</span>
        <InputBase
        className={classes.input}
        defaultValue="1234567"
        inputProps={{ 'aria-label': 'naked' }}
      />
      </Grid>
      <Grid item xs={12}>
        <span className={classes.font}>이름</span>
        <InputBase
        className={classes.input}
        defaultValue="둘리"
        inputProps={{ 'aria-label': 'naked' }}
      />
        </Grid>
      <Grid item xs={12}>
        <span className={classes.font}>나이</span>
        <InputBase
        className={classes.input}
        defaultValue="26"
        inputProps={{ 'aria-label': 'naked' }}
      />
        </Grid>
      <Grid item xs={12}>
        <span className={classes.font}>주소</span>
        <InputBase
        className={classes.input}
        defaultValue="부산시 남구"
        inputProps={{ 'aria-label': 'naked' }}
      />
        </Grid>
      <Grid item xs={12}>
      <span className={classes.font}>보험 여부</span>
      <InputBase
        className={classes.input}
        defaultValue="O"
        inputProps={{ 'aria-label': 'naked' }}
      />
      </Grid>
      <Grid item xs={12}>
      <span className={classes.font}>진료 구분</span>
      <InputBase
        className={classes.input}
        defaultValue="초진"
        inputProps={{ 'aria-label': 'naked' }}
      />
      </Grid>
      <Grid item xs={12}>
      <span className={classes.font}>최근 내원일</span>
      <InputBase
        className={classes.input}
        defaultValue="2021-08-19"
        inputProps={{ 'aria-label': 'naked' }}
      />
      </Grid>

      <Grid item xs={12}>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          multiline
          fullWidth
          label="접수 메모"
          rows={4}
          defaultValue=""
          variant="outlined" 
        />
      </Grid>

        <Button style={{width: '100%', marginTop: '5%'}} variant="contained" color="primary" disableElevation>
      등록하기
    </Button>
    </Grid>
        </form>
      </div>
      </SiteLayout>
    );
}