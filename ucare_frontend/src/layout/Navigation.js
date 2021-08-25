import React, { useEffect } from 'react';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { nurseListItems, doctorListItems, adminListItems } from './listItems';
import { connect } from 'react-redux';
import { drawerManage } from '../redux/drawerManagement/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#F5F5F5'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    backgroundColor: '#F5F5F5'
  }
}));

const Navigation = ( { open, drawerManage }) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => { drawerManage() }}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List >{
              sessionStorage.getItem('role') == '간호사' ? nurseListItems : 
              sessionStorage.getItem('role') == '의사' ? doctorListItems : 
              sessionStorage.getItem('role') == '관리자' && adminListItems }</List>
        </Drawer>
    );
}

const mapStateToProps = (state)=>{
  return{
    open: state.drawerManageReducer.open
  }
}

//object(es6 면 property와 value 값이 같으면 생략가능)
const mapDispatchToProps = {
    drawerManage
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);