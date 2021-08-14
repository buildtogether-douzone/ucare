import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';






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
  input: {
    width: '30%'
  },
  font: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  white: {
    width: '100%',
    backgroundColor: '#FFFFFF'
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
          value={''}
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
          value={''}
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
          value=''
        /> 
        <Typography className={classes.font} style={{padding: '2%', float: 'left',}} variant="body1">세</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography className={classes.font} variant="body1">성별</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={value} onChange={handleChange}>
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="여자"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
          control={<Radio color="primary" />}
          label="남자"
          labelPlacement="end"
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
          id="outlined-tel"
          name="tel"
          autoComplete="tel"
          value={''}
        /> 
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
          value={''}
        /> 
        <SearchIcon style={{float: 'left', fontSize: '45', width: '15%' }} />
      </Grid>

      <Grid item xs={12}>
      <Typography className={classes.font} variant="body1">이메일</Typography>
        <TextField
          style={{width: '45%', float: 'left', backgroundColor: '#FFFFFF'}} 
          variant="outlined"
          required
          fullWidth
          id="outlined-address"
          name="address"
          autoComplete="address"
          value={''}
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
        <Typography className={classes.font} variant="body1">보험 여부</Typography>
        <FormControl component="fieldset">
        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={value} onChange={handleChange}>
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="있음"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
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
        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={value} onChange={handleChange}>
        <FormControlLabel
          value="top"
          control={<Radio color="primary" />}
          label="초진"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
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
        id="date"
        type="date"
        defaultValue="2021-08-14"
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
    </Container>
    );
}