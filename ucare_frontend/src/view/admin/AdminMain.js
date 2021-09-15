import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import Setting from './Setting';
import Hospital from './Hospital';
import Disease from './Disease';
import Medicine from './Medicine';
import SignUp from './SignUp';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  slide:{
    position:'relative', 
    overflow:'scroll',
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

const AdminMain = React.forwardRef((props, ref) => {
  const classes = useStyles();
    return (
      <SiteLayout>
      <FullPage ref={ref} scrollMode='normal'>
        <Slide className={classes.slide}>
          <Setting />
        </Slide>
        <Slide className={classes.slide}>
          <Hospital />
        </Slide>
        <Slide className={classes.slide}>
          <SignUp />
        </Slide>
        <Slide className={classes.slide}>
          <Disease />
        </Slide>
        <Slide className={classes.slide}>
          <Medicine />
        </Slide>
      </FullPage>
      </SiteLayout>
    );
});
export default AdminMain;