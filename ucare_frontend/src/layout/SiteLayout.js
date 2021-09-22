import React, { Fragment, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { drawerManage } from '../redux/drawerManagement/actions';
import styles from '../assets/scss/Layout.scss';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  openState:{
    width:'240px',
    height:'100vh',
    position:'relative',
    visibility:'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  closeState:{
    width:'70px',
    height:'100vh',
    position:'relative',
    visibility:'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }
}));

const Dashboard = ({open, children }) => {
  const classes = useStyles();
  const slideRef = useRef(null);

  return (
    <Fragment>
        <div className={styles.SiteLayout_root}>
          <Header />
          <div className={open ? classes.openState : classes.closeState}>
            {'&&&&&&&&&&&&&&&&&&&&&&&&&'}
          </div>
          <Navigation ref={slideRef}/>
          <main className={styles.content}>
            <div className={classes.appBarSpacer} />
                {React.isValidElement(children) ? React.cloneElement(children, { ref:slideRef }) : children}
          </main>
        </div>
        <Footer />
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);