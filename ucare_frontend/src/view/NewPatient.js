import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import patientService from '../service/patientService';
import SiteLayout from '../layout/SiteLayout';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

export default function Patient() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [ssn, setSSN] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('female');
    const [telNo, setTelNo] = useState('');
    const [address, setAddress] = useState('');
    const [emailId, setEmailId] = useState('');
    const [email, setEmail] = useState('');
    const [insurance, setInsurance] = useState('Y');
    const [diagType, setDiagType] = useState('초진');
    const [visitDate, setVisitDate] = useState('');
    const [remark, setRemark] = useState('');
      
    useEffect(() => {
      const newDate = new Date();
      const date = ('0'+ newDate.getDate()).slice(-2);
      const month = ('0'+( newDate.getMonth() + 1)).slice(-2);
      const year = newDate.getFullYear();
      setVisitDate(`${year}-${month}-${date}`);

      if (telNo.length === 10) {
        setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (telNo.length === 13) {
        setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
      if (ssn.length === 13) {
        setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
      }
    }, [ssn, telNo])
    
    const telNoChange = (e) => {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setTelNo(e.target.value);
      }
    }
  
    const addPatient = (e) => {
      e.preventDefault();
  
    let patient = {
      name: name,
      ssn: ssn,
      age: age,
      gender: gender,
      telNo: telNo,
      address: address,
      email: (emailId + '@' + email ),
      insurance: insurance,
      diagnosis: diagType,
      visitDate: visitDate,
      remark: remark,
      userId: window.sessionStorage.getItem('user')
    }
  
    patientService.addPatient(patient)
    .then( res => {
      console.log(patient.name + '님의 정보가 성공적으로 등록되었습니다.');
    })
    .catch( err => {
      console.log('addPatient() 에러', err);
    });
  };
  
    return(
      <SiteLayout>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <form className={classes.form} noValidate>
      <Grid container spacing={2}> 
      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">이름</Typography>
        <TextField 
          style={{backgroundColor: '#FFFFFF'}}
          variant="outlined"
          required
          fullWidth
          id="outlined-name"
          name="name"
          autoComplete="name"
          value={ name }
          onChange={ (e) => { setName(e.target.value) }}
        /> 
        </Grid>
        <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">주민등록번호</Typography>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-ssn"
          name="ssn"
          autoComplete="ssn"
          value={ ssn }
          onChange={ (e) => { setSSN(e.target.value) }}
        /> 
        </Grid>

      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">나이</Typography>
        <TextField
          style={{width: '30%', float: 'left', textAlignLast: 'right', backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-age"
          name="age"
          autoComplete="age"
          value={ age }
          onChange = { (e) => { setAge(e.target.value) }}
        /> 
        <Typography className={classes.font} style={{padding: '2%', float: 'left',}} variant="body1">세</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">성별</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="gender" name="gender" value={ gender } onChange={ (e) => { setGender(e.target.value) }} >
        <FormControlLabel
          control={<Radio color="primary" />}
          label="여자"
          labelPlacement="end"
          value="female"
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          label="남자"
          labelPlacement="end"
          value="male"
        />
      </RadioGroup>
    </FormControl>
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">전화번호</Typography>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="telNo"
          name="telNo"
          value={ telNo }
          onChange={ telNoChange }
        /> 
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">주소</Typography>
        <TextField
          style={{width: '85%', float: 'left', backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="address"
          name="address"
          autoComplete="address"
          value={ address }
          onChange={ (e) => { setAddress(e.target.value) }}
        /> 
        <SearchIcon style={{float: 'left', fontSize: '45', width: '15%' }} />
      </Grid>

      <Grid item xs={12}>
                <Typography className={classes.font} variant="body1">이메일</Typography>
                <TextField
                  style={{float:'left', width: '45%', backgroundColor: '#FFFFFF' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="emailId"
                  name="emailId"
                  autoComplete="emai"
                  value={ emailId }
                  onChange={ (e) => {setEmailId(e.target.value)}}
                />
                <Typography className={classes.font} style={{ float:'left' ,width: '10%', padding: '2%', textAlign: 'center' }} variant="body1">@</Typography>
                <FormControl variant="outlined" style={{ float:'left', width: '45%', backgroundColor: '#FFFFFF' }}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="email"
                    value={ email }
                    onChange={ (e) => {setEmail(e.target.value)}}
                    >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={'naver.com'}>naver.com</MenuItem>
                    <MenuItem value={'daum.net'}>daum.net</MenuItem>
                    <MenuItem value={'gmail.com'}>gmail.com</MenuItem>
                  </Select>
                </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">보험 여부</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="insurance" name="insurance" value={ insurance } onChange={ (e) => { setInsurance(e.target.value) }} >
        <FormControlLabel
          value="Y"
          control={<Radio color="primary" />}
          label="있음"
          labelPlacement="end"
        />
        <FormControlLabel
          value="N"
          control={<Radio color="primary" />}
          label="없음"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
      </Grid>
 
      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">진료 구분</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="diagnosis" name="diagnosis" value={ diagType } onChange={ (e) => { setDiagType(e.target.value) }} >
        <FormControlLabel
          value="초진"
          control={<Radio color="primary" />}
          label="초진"
          labelPlacement="end"
        />
        <FormControlLabel
          value="재진"
          control={<Radio color="primary" />}
          label="재진"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">최초 내원일</Typography>
      <TextField
        style={{width: '100%'}}
        id="visitDate"
        type="date"
        value={ visitDate }
        onChange={ (e) => { setVisitDate(e.target.value) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">비고</Typography>
        <TextField
          style={{width: '100%', backgroundColor: '#FFFFFF'}} 
          multiline
          rows={4}
          variant="outlined" 
          value={ remark }
          onChange={ (e) => { setRemark(e.target.value) }}
        />
      </Grid>

        <Button 
          style={{width: '100%', marginTop: '5%'}} 
          variant="contained" 
          color="primary"
          href="/Home"
          type="submit"
          onClick={ addPatient} 
          disableElevation>
      등록하기
    </Button>
    </Grid>
        </form>
      </div>
    </Container>
    </SiteLayout>
    );
}