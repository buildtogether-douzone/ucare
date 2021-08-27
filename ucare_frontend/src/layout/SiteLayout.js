import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    msOverflowStyle:"none",
    "&::-webkit-scrollbar": {
      display:"none !important"
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    margin:0,
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard({ children }) {
  const classes = useStyles();

  return (
    <Fragment>
        <div className={classes.root}>
          <Header />
          <Navigation />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
                {children}
          </main>
        </div>
        <Footer />
    </Fragment>
  );
}