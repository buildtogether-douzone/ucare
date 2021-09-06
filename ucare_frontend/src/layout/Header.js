import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import userService from '../service/userService';
import Typography from '@material-ui/core/Typography';
import { Avatar } from 'primereact/avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { drawerManage } from '../redux/drawerManagement/actions';
import { Dialog } from 'primereact/dialog';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    position: 'fixed',
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(to right, #1C91FB, #07BDF4)"
  },
  appBarShift: {
    position: 'fixed',
    display: 'flex',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  image: {
    float: 'left',
    width: '200px',
    height: '179px'
  }
}));


const Header = ({ open, drawerManage }) => {
  const classes = useStyles();
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState('center');
  const [name, setName] = useState('');
  const [URL, setURL] = useState('');
  const [email, setEmail] = useState('');
  

  const dialogFuncMap = {
    'displayPosition': setDisplayPosition,
  }

  useEffect(() => {
    let user = {
      id: sessionStorage.getItem('user')
    };

    userService.fetchUserByID(user)
      .then(res => {
        setName(res.data.name);
        setURL(res.data.image);
        setEmail(res.data.emailId + '@' + res.data.email)
      })
      .catch(err => {
        console.log('fetchUser() 에러', err);
      });
  }, [])

  const onClickButton = (name, position) => {
    dialogFuncMap[`${name}`](true);
    setPosition(position);
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const avatarClickHandler = () => {
    displayPosition == false ?
      onClickButton('displayPosition', 'top-right') :
      onHide('displayPosition');
  }

  const logout = (e) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    sessionStorage.clear();
  }

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => { drawerManage() }}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <Button
            href="/Home"
            style={{ padding: '0px', width: '100px', fontSize: '20px', color: '#FFFFFF' }} >U-Care</Button>
        </div>
        <Typography style={{fontSize:'20px', marginRight:'20px'}}>
            {name}님
        </Typography>
        <Avatar
          className="p-mr-2"
          style={URL == null ? 
            { backgroundImage: `url(${require("../assets/image/profile.jpg")})`, backgroundSize:'cover' } : 
            { backgroundImage: `url(${URL})`, backgroundSize:'cover' }}
          size="large"
          shape="circle"
          onClick={() => { avatarClickHandler() }}
        />

        <Button
          href="/"
          onClick={logout}
          style={{ padding: '0px', fontSize: '16px', color: '#FFFFFF' }} >
          <ExitToAppIcon style={{ fontSize: '35px' }} />
        </Button>

        <Dialog header="회원 정보" visible={displayPosition} position={position} modal style={{width: '28vw', height:'30%' , marginTop: '4%' }} onHide={() => onHide('displayPosition')}
          draggable={false} resizable={true}>
            <div className={classes.image} style={URL == null ? 
              { backgroundImage: `url(${require("../assets/image/profile.jpg")})`, backgroundSize:'100% 100%' } : 
              { backgroundImage: `url(${URL})`, backgroundSize:'100% 100%'}}>
            </div>
            <div style={{marginLeft:'20px', float:'left'}}>
              <Typography style={{fontSize:'20px'}}>
                  {name}님
              </Typography>
              <Typography style={{fontSize:'20px'}}>
                  {email}
              </Typography>
            </div>
            <div style={{position:'absolute', top:'78%', right:'5%', float:'right', backgroundColor:'#A7A7A7'}}>
              <Button label="정보 수정" href="/#/profile">프로필 수정</Button>
            </div>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    open: state.drawerManageReducer.open
  }
}

const mapDispatchToProps = {
  drawerManage
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);