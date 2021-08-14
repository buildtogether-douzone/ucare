import React from 'react';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    margin: theme.spacing(10),

  },
  paper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  profile: {
    display: 'block',
    textAlign: 'right',
    width: '200px',
     height: '230px',
    border: '1px solid #AAAAAA',
    backgroundImage: `url(${require("../assets/image/profile.jpg")})`, 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center', 
    overflow: 'hidden',
  },
  Button: {
    width: '200px',
    height: '230px',
        display: 'flex',
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

      <div className={classes.root}>
              <Grid container spacing={10}>

<Grid item xs={12} sm={5}>
  <div className={classes.profile}/>
<Button
  variant="contained"
  color="default"
  startIcon={<CloudUploadIcon />}>
  Upload
</Button>
</Grid>

<Grid item xs={12} sm={7}>
      <form className={classes.paper} noValidate>
      <Grid container spacing={1}> 
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
        /> 
        </Grid>
        <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">비밀번호</Typography>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          type="password"
          id="outlined-password"
          name="password"
          autoComplete="password"
        /> 
        </Grid>

        <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">비밀번호 확인</Typography>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          type="password"
          id="outlined-password1"
          name="password1"
          autoComplete="password1"
        /> 
        </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">전화번호</Typography>
        <TextField
          style={{backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-tel"
          name="tel"
          autoComplete="tel"
        /> 
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">이메일</Typography>
        <TextField
          style={{width: '45%', float: 'left', backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-email"
          name="email"
          autoComplete="email"
        /> 
      <Typography className={classes.font} style={{width: '10%', float: 'left', padding: '2%', textAlign: 'center'}} variant="body1">@</Typography>
        <FormControl variant="outlined" style={{width: '45%', float: 'left', backgroundColor: '#FFFFFF'}}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChangeEmail}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'@google.com'}>google.com</MenuItem>
          <MenuItem value={20}>naver.com</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      </Grid>
      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">주소</Typography>
        <TextField
          style={{width: '85%', float: 'left', backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-address"
          name="address"
          autoComplete="address"
        /> 
        <SearchIcon style={{float: 'left', fontSize: '45', width: '15%' }} />
      </Grid>


      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">생년월일</Typography>
      <TextField
        style={{width: '100%'}}
        id="date"
        type="date"
        defaultValue="2021-08-14"
        InputLabelProps={{
          shrink: true,
        }}
      />
      </Grid>

        <Button style={{width: '100%', marginTop: '5%'}} variant="contained" color="primary" disableElevation>
      등록하기
    </Button>
    </Grid>
        </form>
        </Grid>
</Grid>
      </div>

    );
}