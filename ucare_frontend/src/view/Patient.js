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



export default function Patient(props) {
    const classes = useStyles();
    const [name, setName] = useState(props.location.state.name);
    const [ssn, setSSN] = useState(props.location.state.ssn);
    const [age, setAge] = useState(props.location.state.age);
    const [gender, setGender] = useState(props.location.state.gender);
    const [telNo, setTelNo] = useState(props.location.state.telNo);
    const [address, setAddress] = useState(props.location.state.age);
    const [emailId, setEmailId] = useState(props.location.state.emailId);
    const [email, setEmail] = useState(props.location.state.email);
    const [insurance, setInsurance] = useState(props.location.state.insurance);
    const [diagnosis, setDiagnosis] = useState(props.location.state.diagnosis);
    const [insDt, setInsDt] = useState(props.location.state.insDt);
    const [remark, setRemark] = useState(props.location.state.remark);

    useEffect(() => {

      const newDate = new Date();
      const date = ('0'+ newDate.getDate()).slice(-2);
      const month = ('0'+( newDate.getMonth() + 1)).slice(-2);
      const year = newDate.getFullYear();
  
      const getGender = ssn.substr(7, 1)

      if (getGender % 2 == 1) {
        setGender('남');
      } else {
        setGender('여');
      };
    
      let ageYear = 0;
      
      if (getGender <= 2) {
        ageYear = "19"
      } else {
        ageYear = "20"
      };

      const ageNum = ageYear.concat(ssn.substr(0, 2));
      const monthDay = month + date;
      setAge(monthDay < ssn.substr(2, 4) ? year - ageNum - 1 : year - ageNum); 
      
      if (telNo.length === 10) {
        setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (telNo.length === 13) {
        setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
      if (ssn.length === 13) {
        setSSN(ssn.replace(/(\d{6})(\d{7})/, '$1-$2'));
      }
    }, [ssn, telNo, gender, age]);
  
    const telNoChange = (e) => {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setTelNo(e.target.value);
      }
    }

    const update = (e) => {
      e.preventDefault();
  
      let patient = {
        name: name,
        ssn: ssn,
        age: age,
        gender: gender,
        telNo: telNo,
        address: address,
        domain: (emailId + '@' + email ),
        insurance: insurance,
        remark: remark,
        patientNo: props.location.state.patientNo,
        uptNo: window.sessionStorage.getItem('user')
      }
  
      patientService.update(patient)
        .then(res => {
          console.log(patient.name + '님의 정보가 성공적으로 수정되었습니다.');
        })
        .catch(err => {
          console.log('updatePatient() 에러', err);
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
        <Typography className={classes.font} variant="body1">성별</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="gender" name="gender" value={ gender } onChange={ (e) => { setGender(e.target.value) }} >
        <FormControlLabel
          control={<Radio color="primary" />}
          label="여자"
          labelPlacement="end"
          value="여"
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          label="남자"
          labelPlacement="end"
          value="남"
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
                  onChange={ (e) => { setEmailId(e.target.value) }}
                />
                <Typography className={classes.font} style={{ float:'left' ,width: '10%', padding: '2%', textAlign: 'center' }} variant="body1">@</Typography>
                <FormControl variant="outlined" style={{ float:'left', width: '45%', backgroundColor: '#FFFFFF' }}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="email"
                    value={ email }
                    onChange={ (e) => { setEmail(e.target.value) }}
                    >
                    <MenuItem value={'gmail.com'}>gmail.com</MenuItem>
                    <MenuItem value={'naver.com'}>naver.com</MenuItem>
                    <MenuItem value={'daum.net'}>daum.net</MenuItem>
                    <MenuItem value={'yahoo.co.kr'}>yahoo.co.kr</MenuItem>
                    <MenuItem value={'hotmail.com'}>hotmail.com</MenuItem>
                    <MenuItem value={'nate.com'}>nate.com</MenuItem>
                    <MenuItem value={'empas.com'}>empas.com</MenuItem>
                    <MenuItem value={'hotmail.com'}>hotmail.com</MenuItem>
                    <MenuItem value={'weppy.com'}>weppy.com</MenuItem>
                    <MenuItem value={'korea.com'}>korea.com</MenuItem>
                    <MenuItem value={'mail.co.kr'}>hotmail.com</MenuItem>
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
        <RadioGroup row aria-label="diagnosis" name="diagnosis" value={ diagnosis } onChange={ (e) => { setDiagnosis(e.target.value) }} >
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
        fullWidth
        id="insDt"
        variant="outlined"
        defaultValue={ insDt }
        InputProps={{
          readOnly: true,
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
          onClick={ update }
          disableElevation>
      수정하기
    </Button>
    </Grid>
        </form>
      </div>
    </Container>
    </SiteLayout>
    );
}