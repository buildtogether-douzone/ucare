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



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    },
  input: {
    width: '30%',
    fontSize: '16px',
    fontWeight: '600',
  },


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
        <div className={classes.root} >
        <div className={classes.input} >
        <p style={{marginBottom: '2px'}}>이름</p>
        <TextField style={{width: '100%', backgroundColor: '#FFFFFF'}} id="outlined-name" variant="outlined" />
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>주민등록번호</p>
        <TextField style={{width: '100%', backgroundColor: '#FFFFFF'}} id="outlined-ssn" variant="outlined" />
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>나이</p>
        <TextField style={{width: '30%', float: 'left', textAlignLast: 'right', backgroundColor: '#FFFFFF'}} id="outlined-age" variant="outlined" />
        <p style={{float: 'left', marginLeft:'10px'}}>세</p>
        </div>
        <div className={classes.input}>
        <p style={{marginBottom: '2px', marginTop: '20px'}}>성별</p>
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
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>전화번호</p>
        <TextField style={{width: '100%', backgroundColor: '#FFFFFF'}} id="outlined-tel" variant="outlined" />
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>주소</p>
        <TextField style={{float: 'left', width: '85%', backgroundColor: '#FFFFFF'}} id="outlined-address" variant="outlined" />
        <SearchIcon style={{float: 'left', width: '15%', fontSize: '45'}} />
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>이메일</p>
        <TextField style={{width: '50%', float: 'left', backgroundColor: '#FFFFFF'}} id="outlined-email" variant="outlined" />
        <p style={{float: 'left', width: '10%', textAlign: 'center'}}>@</p>
        <FormControl variant="outlined" style={{width: '40%', float: 'left', backgroundColor: '#FFFFFF'}}>
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
        </div>
        <div className={classes.input}>
        <p style={{marginBottom: '2px', marginTop: '20px'}}>보험 여부</p>
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
        </div>
        <div className={classes.input}>
        <p style={{marginBottom: '2px', marginTop: '20px'}}>진료 구분</p>
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
        </div>

        <div className={classes.input}>
        <p style={{marginBottom: '5px', marginTop: '20px'}}>최초 내원일</p>
        <form noValidate>
      <TextField
        style={{width: '100%'}}
        id="date"
        type="date"
        defaultValue="2021-08-14"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
        </div>
        <div className={classes.input} >
        <p style={{marginBottom: '2px', marginTop: '20px'}}>비고</p>
        <TextField
          style={{width: '100%', backgroundColor: '#FFFFFF'}}
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined" />
        </div>
        <div className={classes.input} >
        <Button style={{width: '100%', marginTop: '20px'}} variant="contained" color="primary" disableElevation>
      등록하기
    </Button>
        </div>

      </div>
    );
}