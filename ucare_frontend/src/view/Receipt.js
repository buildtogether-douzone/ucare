import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
  const [value, setValue] = React.useState('top');
  
  const handleChange = (event) => {
    setValue(event.target.value);
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
              <div style={{width: '69%', marginLeft: '140px'}}>
              <TextField
              className={classes.textField}
                style={{ backgroundColor: '#FFFFFF'}}
                multiline
                fullWidth
                label="접수 메모"
                rows={4}
                defaultValue=""
                variant="outlined"
              />
              </div>
            </Grid>

            <Button style={{marginTop: '10px'}} variant="outlined" size="small" color="primary">접수</Button>
          </Grid>
        </form>
      </div>
    </SiteLayout>
  );
}