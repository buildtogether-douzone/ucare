import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { drawerManage } from '../redux/drawerManagement/actions';

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
  }
}));


const Header = ({ open, drawerManage }) => {
  const classes = useStyles();

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
        <div style={{ flexGrow:1 }}>
          <Button
            href="/Home"
            style={{ padding: '0px', width: '100px', fontSize: '20px', color: '#FFFFFF' }} >U-Care</Button>
        </div>
        <Avatar alt="Remy Sharp" onClick={()=>{console.log("!!!")}}/>
        <Button
          href="/"
          onClick={logout}
          style={{ padding: '0px', fontSize: '16px', color: '#FFFFFF' }} >
          <ExitToAppIcon style={{ fontSize: '35px' }} />
        </Button>
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