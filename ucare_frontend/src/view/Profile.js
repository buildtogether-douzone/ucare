import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import userService from '../service/userService';
import SiteLayout from '../layout/SiteLayout';
import basicImg from '../assets/image/basicImg.jpg';
import { useRecoilState } from 'recoil';
import { reloadProfile } from '../recoil/atom/profileAtom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    margin: theme.spacing(5),
    width: '50% '
  },
  font: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  image: {
    display: 'block',
    top: 80,
    right: 80,
    float: 'left',
    marginTop:'1%',
    marginRight: '80px',
    marginLeft: '10%'
  },
  profile: {
    display: 'block',
    width: '200px',
    height: '230px',
    border: '1px solid #AAAAAA',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%, 100%',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
  button: {
    display: 'block',
    width: '200px',
    height: '40px'
},
  profile_img: {
    width: '160px',
    height: '160px',
    borderRadius: '70%',
    overflow: 'hidden'
},
  profile_img_img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}

}));


export default function Profile() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telNo, setTelNo] = useState('');
  const [email, setEmail] = useState('email@co.kr');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [imageURL, setImageURL] = useState('');

  const [reload, setReload] = useRecoilState(reloadProfile);

  useEffect(() => {
    let user = {
      id: sessionStorage.getItem('user')
    };

    const newDate = new Date();
    const date = ('0' + newDate.getDate()).slice(-2);
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();

    userService.fetchUserByID(user)
      .then(res => {
        setName(res.data.name);
        setPassword(res.data.password);
        setConfirmPassword(res.data.password);
        setTelNo(res.data.telNo);
        setAddress(res.data.address);
        setEmail(res.data.email);
        setPreviewURL(res.data.image);
        setImageURL(res.data.image);
        res.data.birth ? setBirth(res.data.birth) : setBirth(`${year}-${month}-${date}`);
      })
      .catch(err => {
        console.log('updateUser() 에러', err);
      });
  }, []);

  useEffect(() => {
    if (telNo.length === 10) {
      setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (telNo.length === 13) {
      setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [telNo])

  const telNoChange = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setTelNo(e.target.value);
    }
  }

  const hasError = passwordEntered =>
    password.length < 5 ? true : false;

  const hasNotSameError = passwordEntered =>
    password != confirmPassword ? true : false;


  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const hasNotValidError = emailEntered =>
    regex.test(email) ? false : true; 


  const saveUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    };

    let user = {
      id: window.sessionStorage.getItem('user'),
      name: name,
      password: password,
      telNo: telNo,
      email: email,
      address: address,
      birth: birth,
      image: imageURL
    }

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: "application/json"}));
    formData.append('file', file || null);

    userService.updateUser(formData)
      .then(res => {
        console.log(user.name + '님의 정보가 성공적으로 수정되었습니다.');
        setReload(!reload);
      })
      .catch(err => {
        console.log('updateUser() 에러', err);
      });
  };

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <SiteLayout >
      <div className="p-grid" style={{ margin: '20px' }}>
      <div className="p-col-12">
      <div className="card p-fluid">
      <Card>
      <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center' }}>프로필 수정</span>
      <Divider />
      <div className="p-grid" >
          <div className="p-col-12 p-lg-6" style={{ margin: '0 auto' }}>
        <div style={{ display: 'block', textAlign:'center' }}>
      <div className={classes.profile_img} style={{ margin: '0 auto' }}>
        {previewURL != null ? 
          <img className={classes.profile_img_img} src={previewURL} />
          : <img className={classes.profile_img_img} src={basicImg} />}
        </div>
        <Button
          style={{ border: '1px solid #1C91FB', marginTop: '10px', height: '35px' }}
          variant="outlined"
          size="small"
          component="label"
          startIcon={
            <span>
              <CloudUploadIcon style={{ padding: '8px 0 0 0', color: '#1C91FB' }} /><span style={{ padding: '0 0 0px 2px', color: '#1C91FB', fontSize: '16px' }}>프로필 사진</span>
            </span>
          }>
          <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" onChange={handleFileOnChange} />
        </Button>
        </div>
            <Typography className={classes.font} variant="body1">이름</Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1">비밀번호</Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              label="비밀번호(5자 이상)"
              error={hasError('password')}
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <Typography className={classes.font} variant="body1">비밀번호 확인</Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="current-password"
              label="비밀번호 확인"
              error={hasNotSameError('confirmPassword')}
              helperText={
                hasNotSameError('confirmPassword') ? "입력한 비밀번호와 일치하지 않습니다." : null
              }
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
          

            <Typography className={classes.font} variant="body1">전화번호</Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              id="telNo"
              name="telNo"
              value={telNo}
              onChange={telNoChange}
            />

            <Typography className={classes.font} variant="body1">이메일</Typography>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              error={hasNotValidError('email')}
              helperText={
                hasNotValidError('email') ? "이메일 주소를 다시 확인해주세요." : null
              }
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <Typography className={classes.font} variant="body1">주소</Typography>
            <TextField
              style={{ width: '90%' }}
              variant="outlined"
              size="small"
              required
              fullWidth
              id="address"
              name="address"
              autoComplete="address"
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
            />
            <SearchIcon style={{ width: '10%', fontSize: '38px', color: '#1C91FB', cursor: 'pointer' }} />
            <TextField
                style={{ marginTop: '10px'}}
                variant="outlined"
                size="small"
                fullWidth
                id="detailAddress"
                name="detailAddress"
                autoComplete="detailAddress"
                // value={detailAddress}
                // onChange={(e) => { setDetailAddress(e.target.value) }}
              />

            <Typography className={classes.font} variant="body1">생년월일</Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              id="date"
              type="date"
              value={birth}
              onChange={(e) => { setBirth(e.target.value) }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          <Button
            style={{ width: '100%', border: 'solid #1C91FB', marginTop: '5%', backgroundColor: '#1C91FB', color: 'white' }}
            variant="outlined"
            href="/Home"
            type="submit"
            onClick={saveUpdate}
            disableElevation>
            수정하기
          </Button>
      </div>
      </div>
      </Card>
      </div>
      </div>
      </div>
    </SiteLayout>
  );
}