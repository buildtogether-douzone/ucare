import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = {
    open: () => setOpen(true),
    close: () => setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Header handleDrawer={ handleDrawer }  open={ open }/>
      <Navigation handleDrawer={ handleDrawer } open={ open }/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          </Grid>
          <Footer />
        </Container>
      </main>
    </div>
  );
}